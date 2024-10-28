import {Routes} from '@angular/router';
import {GroupTypesComponent} from "@features/admin/groupTypes/group-types.component";

export const GROUP_TYPES_ROUTES: Routes = [
  {
    // Default Groups Types home page
    path     : '',
    component: GroupTypesComponent
  },
];
