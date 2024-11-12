import {Routes} from '@angular/router';
import {GroupTypesComponent} from "@features/admin/groupTypes/group-types.component";
import {GroupTypesStore} from "@features/admin/groupTypes/group-types.store";
import {GroupTypesDataService} from "@features/admin/groupTypes/_services/group-types-data.service";

export const GROUP_TYPES_ROUTES: Routes = [
  {
    // Default Groups Types home page
    path     : '',
    component: GroupTypesComponent,
    providers: [GroupTypesStore, GroupTypesDataService]
  },
];
