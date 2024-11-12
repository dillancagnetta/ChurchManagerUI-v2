import {
  patchState,
  signalStore,
  signalStoreFeature,
  type,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState
} from '@ngrx/signals';
import {BaseState, withCrudOperations} from "@core/store/crud-state.feature";
import {GroupTypeEntity} from "@features/admin/groupTypes/group-type.model";
import {GroupTypesDataService, GroupTypesFilter} from "@features/admin/groupTypes/_services/group-types-data.service";

export interface GroupTypesState extends BaseState<GroupTypeEntity> {
  filters: GroupTypesFilter;
  selected?: GroupTypeEntity
}

export const initialState: GroupTypesState = {
  items: [],
  loading: false,
  filters: {},
  selected: null
};

export const GroupTypesStore = signalStore(
  withState(initialState),
  withCrudOperations({
    dataServiceType: GroupTypesDataService,
    filter: {}
  }),
  withGroupTypeSelectors(),
  withMethods((store) => ({
    toggleDone(item: GroupTypeEntity) {
      // this.update({ ...item, done: !item.done });
    },
    setSelected(id: number) {
      patchState(store, { selected: store.items().find((x) => x.id === id) });
    },
  })),
  withHooks({
    onInit(store) {
      console.log('GroupTypesStore: on init');
      store.browse(store.filters);
      // loadAll()

      watchState(store, (state) => {
        console.log('[watchState] GroupTypesStore state', state);
      });
    },
    onDestroy() {
      console.log('GroupTypesStore: on destroy');
    },
  })
);


export function withGroupTypeSelectors() {
  return signalStoreFeature(
    {
      state: type<GroupTypesState>(),
    },
    withComputed(({ items }) => ({
      /*doneCount: computed(() => items().filter((x) => x.done).length),
      undoneCount: computed(() => items().filter((x) => !x.done).length),
      percentageDone: computed(() => {
        const done = items().filter((x) => x.done).length;
        const total = items().length;

        if (total === 0) {
          return 0;
        }

        return (done / total) * 100;
      }),*/
    }))
  );
}