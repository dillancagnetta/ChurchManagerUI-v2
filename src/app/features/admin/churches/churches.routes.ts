import {Routes} from "@angular/router";
import {ChurchesComponent} from "@features/admin/churches/churches.component";
import {ChurchGroupsDataService} from "@features/admin/churches/_services/church-groups-data.service";
import {ChurchGroupsStore} from "@features/admin/churches/church-groups.store";

export const CHURCHES_ROUTES: Routes = [
  {
    // Default Churches home page
    path     : '',
    component: ChurchesComponent,
    providers: [ChurchGroupsStore, ChurchGroupsDataService]
  },
];
