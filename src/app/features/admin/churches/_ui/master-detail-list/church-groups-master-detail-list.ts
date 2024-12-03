import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {FuseScrollbarModule} from "@fuse/directives/scrollbar";
import {GeneralTableModule} from "@ui/components/general-table/general-table.module";
import {ChurchGroupsStore} from "@features/admin/churches/church-groups.store";
import {ChurchGroupsListComponent} from "@features/admin/churches/_ui/church-groups-list/church-groups-list.component";
import {GroupTypesListComponent} from "@features/admin/groupTypes/_ui/group-types-list/group-types-list.component";

@Component({
  selector: 'church-groups-master-detail-list',
  templateUrl: './church-groups-master-detail-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FuseScrollbarModule,
    GeneralTableModule,
    ChurchGroupsListComponent,
    GroupTypesListComponent
  ],
  standalone: true
})
export class ChurchGroupsMasterDetailList {
  private readonly _store = inject(ChurchGroupsStore);

  $data = this._store.items;
  $loading = this._store.loading;
  $selected = this._store.selected;

  onButtonClicked($event: any) {
    console.log($event);
  }
}