import {ChangeDetectionStrategy, Component, input, output} from "@angular/core";
import {FuseScrollbarModule} from "@fuse/directives/scrollbar";
import {GeneralTableModule} from "@ui/components/general-table/general-table.module";
import {TableBtn, TableColumn, TableToolbar} from "@ui/components/general-table";
import {ChurchGroupEntity} from "@features/admin/churches/churches.model";
import {GroupTypeEntity} from "@features/admin/groupTypes/group-type.model";
import {ButtonActions} from "@shared/shared.models";

@Component({
  selector: 'church-groups-list',
  templateUrl: './church-groups-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FuseScrollbarModule,
    GeneralTableModule
  ],
  standalone: true
})
export class ChurchGroupsListComponent {
  columns: TableColumn[];
  buttons: TableBtn[] = [];
  toolbar: TableToolbar[] = [];

  $data = input.required<ChurchGroupEntity[]>();
  addButtonClicked = output<any>();
  $isLoading = input<boolean>(false);

  constructor()
  {
    this.columns = [
      { columnDef: 'name',     header: 'Name',    cell: (element: ChurchGroupEntity) => `${element.name}` },
      { columnDef: 'description',     header: 'Description',    cell: (element: ChurchGroupEntity) => `${element.description ?? ''}` },
      { columnDef: 'leaderPerson',
        header: 'Leader',
        columnType:'person',
        link: (element: ChurchGroupEntity) => `/pages/profile/${element.leaderPerson?.id ?? ''}`,
        cell: (element: ChurchGroupEntity) => element.leaderPerson,
      },
    ];

    this.buttons = [
      { icon: 'build',    payload: (element: ChurchGroupEntity) => `${element.id}`, action: ButtonActions.Edit, text: 'Edit' },
      { icon: 'delete',    payload: (element: ChurchGroupEntity) => `${element.id}`, action: ButtonActions.Delete, text: 'Remove', disabledFn: (element: GroupTypeEntity) => element.isSystem },
    ];

    this.toolbar = [
      {icon: 'add', color: 'primary', tooltip: 'Add item', action: 'add', text: 'Add'},
    ];
  }

}