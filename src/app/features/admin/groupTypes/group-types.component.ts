import {Component, inject} from "@angular/core";
import {GroupTypesListComponent} from "@features/admin/groupTypes/_ui/group-types-list/group-types-list.component";
import {GroupTypesStore} from "@features/admin/groupTypes/group-types.store";
import {GroupTypesDataService} from "@features/admin/groupTypes/_services/group-types-data.service";

@Component({
  templateUrl: './group-types.component.html',
  standalone: true,
  imports: [
    GroupTypesListComponent
  ],
  providers:[GroupTypesStore, GroupTypesDataService]
})
export class GroupTypesComponent {

  private readonly _store = inject(GroupTypesStore)

  $data = this._store.items;

}