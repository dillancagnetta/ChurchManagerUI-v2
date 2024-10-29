import {CrudService} from "@shared/api/crud-http-base.service";
import {computed, inject, ProviderToken, Type} from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, type, withComputed, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';

export type Entity = { id: number };
export type Filter = Record<string, unknown>;

export type BaseState<TEntity> = {
  items: TEntity[];
  loading: boolean;
};

export function withCrudOperations<E extends Entity, F extends Filter>(
  options: {
    dataServiceType: Type<CrudService<E, F>>;
    filter: F;
    collection?: string;
  }
) {
  const { dataServiceType, filter, collection } = options;

  return signalStoreFeature(
    {
      state: type<BaseState<E>>(),
    },
    withMethods((store) => {
      const service = inject(dataServiceType);

      return {
        addItem: rxMethod<string>(
          switchMap((value) => {
            patchState(store, { loading: true });

            return service.create(value).pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, {
                    items: [...store.items(), response.data],
                  });
                },
                error: console.error,
                finalize: () => patchState(store, { loading: false }),
              }),
            );
          }),
        ),

        browse: rxMethod<F>(
          switchMap((filter) => {
            patchState(store, { loading: true });

            return service.browse(filter).pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, { items: response.data, loading: false });
                },
                error: console.error,
                finalize: () => patchState(store, { loading: false }),
              }),
            );
          }),
        ),

        loadAll: rxMethod<void>(
          switchMap(() => {
            patchState(store, { loading: true });

            return service.getAll().pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, { items: response.data, loading: false });
                },
                error: console.error,
                finalize: () => patchState(store, { loading: false }),
              }),
            );
          }),
        ),

        deleteItem: rxMethod<E>(
          switchMap((item) => {
            patchState(store, { loading: true });

            return service.delete(item).pipe(
              tapResponse({
                next: () => {
                  patchState(store, {
                    items: [...store.items().filter((x) => x.id !== item.id)],
                  });
                },
                error: console.error,
                finalize: () => patchState(store, { loading: false }),
              }),
            );
          }),
        ),

        update: rxMethod<E>(
          switchMap((item) => {
            patchState(store, { loading: true });

            return service.update(item).pipe(
              tapResponse({
                next: (response) => {
                  const allItems = [...store.items()];
                  const index = allItems.findIndex((x) => x.id === item.id);

                  allItems[index] = response.data;

                  patchState(store, {
                    items: allItems,
                  });
                },
                error: console.error,
                finalize: () => patchState(store, { loading: false }),
              }),
            );
          }),
        ),
      };
    }),

    withComputed(({ items }) => ({
      allItemsCount: computed(() => items().length),
    })),
  );
}