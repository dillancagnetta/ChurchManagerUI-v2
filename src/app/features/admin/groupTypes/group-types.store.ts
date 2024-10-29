import {signalStore, signalStoreFeature, type, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {BaseState, withCrudOperations} from "@core/store/crud-state.feature";
import {GroupTypeEntity} from "@features/admin/groupTypes/group-type.model";
import {GroupTypesDataService, GroupTypesFilter} from "@features/admin/groupTypes/_services/group-types-data.service";

export interface GroupTypesState extends BaseState<GroupTypeEntity> {
  filters: GroupTypesFilter;
}

export const initialState: GroupTypesState = {
  items: [],
  loading: false,
  filters: {}
};

export const GroupTypesStore = signalStore(
  withState(initialState),
  withCrudOperations({
    dataServiceType: GroupTypesDataService,
    filter: {}
  }),
  withGroupTypeSelectors(),
  withMethods(() => ({
    toggleDone(item: GroupTypeEntity) {
      // this.update({ ...item, done: !item.done });
    },
  })),
  withHooks({
    onInit({ browse, filters, loadAll }) {
      console.log('GroupTypesStore: on init');
      browse(filters);
      // loadAll()
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