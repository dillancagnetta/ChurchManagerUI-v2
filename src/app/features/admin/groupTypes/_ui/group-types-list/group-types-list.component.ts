import {ChangeDetectionStrategy, Component, input, output} from "@angular/core";
import {TableBtn, TableColumn, TableToolbar} from "@ui/components/general-table";
import {GroupTypeEntity} from "@features/admin/groupTypes/group-type.model";
import {FuseScrollbarModule} from "@fuse/directives/scrollbar";
import {GeneralTableModule} from "@ui/components/general-table/general-table.module";
import {ButtonActions} from "@shared/shared.models";

@Component({
  selector: 'group-types-list',
  templateUrl: './group-types-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FuseScrollbarModule,
    GeneralTableModule
  ],
  standalone: true
})
export class GroupTypesListComponent {
  columns: TableColumn[];
  buttons: TableBtn[] = [];
  toolbar: TableToolbar[] = [];

  $data = input.required<GroupTypeEntity[]>();
  addButtonClicked= output<any>();
  $isLoading= input<boolean>(false);

  constructor()
  {
    this.columns = [
      { columnDef: 'name',     header: 'Name',    cell: (element: GroupTypeEntity) => `${element.name}` },
      { columnDef: 'description',     header: 'Description',    cell: (element: GroupTypeEntity) => `${element.description ?? ''}` },
      { columnDef: 'groupTerm',     header: 'Group Term',     cell: (element: GroupTypeEntity) => `${element.groupTerm}` },
      { columnDef: 'groupMemberTerm',   header: 'Group Member Term',   cell: (element: GroupTypeEntity) => `${element.groupMemberTerm}` },
      { columnDef: 'takesAttendance',    header: 'Takes Attendance', columnType: 'checkbox',   cell: (element: GroupTypeEntity) => element.takesAttendance },
      { columnDef: 'isSystem', header: 'Is System', columnType: 'checkbox',cell: (element: GroupTypeEntity) => element.isSystem },
      { columnDef: 'iconCssClass',     header: 'Icon CSS class', columnType: 'icon', cell: (element: GroupTypeEntity) => element.iconCssClass ?? '' }
    ];

    this.buttons = [
      { icon: 'build',    payload: (element: GroupTypeEntity) => `${element.id}`, action: ButtonActions.Edit, text: 'Edit' },
      { icon: 'delete',    payload: (element: GroupTypeEntity) => `${element.id}`, action: ButtonActions.Delete, text: 'Remove', disabledFn: (element: GroupTypeEntity) => element.isSystem },
    ];

    this.toolbar = [
      {icon: 'add', color: 'primary', tooltip: 'Add item', action: 'add', text: 'Add'},
    ];
  }

}