import {BaseState, withCrudOperations} from "@core/store/crud-state.feature";
import {ChurchesGeneralFilter, ChurchGroupEntity} from "@features/admin/churches/churches.model";
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
} from "@ngrx/signals";
import {ChurchGroupsDataService} from "@features/admin/churches/_services/church-groups-data.service";

export interface ChurchGroupsState extends BaseState<ChurchGroupEntity> {
  filters: ChurchesGeneralFilter;
  selected?: ChurchGroupEntity
}

export const initialState: ChurchGroupsState = {
  items: [],
  loading: false,
  filters: {},
  selected: null
};

export const ChurchGroupsStore = signalStore(
  withState(initialState),
  withCrudOperations({
    dataServiceType: ChurchGroupsDataService,
    filter: {}
  }),
  withChurchGroupSelectors(),
  withMethods((store) => ({
    toggleDone(item: ChurchGroupEntity) {
      // this.update({ ...item, done: !item.done });
    },
    setSelected(id: number) {
      patchState(store, { selected: store.items().find((x) => x.id === id) });
    },
  })),
  withHooks({
    onInit(store) {
      console.log('ChurchGroupsStore: on init');
      store.browse(store.filters);
      //store.loadAll();

      watchState(store, (state) => {
        console.log('[watchState] ChurchGroupsStore state', state);
      });
    },
    onDestroy() {
      console.log('ChurchGroupsStore: on destroy');
    },
  })
);


export function withChurchGroupSelectors() {
  return signalStoreFeature(
    {
      state: type<ChurchGroupsState>(),
    },
    withComputed(({ items }) => ({

    }))
  );
}