import {ChangeDetectionStrategy, Component, input, output} from "@angular/core";
import {TableBtn, TableColumn} from "@ui/components/general-table";
import {GroupTypeEntity} from "@features/admin/groupTypes/group-type.model";
import {FuseScrollbarModule} from "@fuse/directives/scrollbar";
import {GeneralTableModule} from "@ui/components/general-table/general-table.module";

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

  $data = input.required<GroupTypeEntity[]>();
  addButtonClicked= output<void>()

  constructor()
  {
    this.columns = [
      { columnDef: 'name',     header: 'Name',    cell: (element: GroupTypeEntity) => `${element.name}` },
      { columnDef: 'description',     header: 'Description',    cell: (element: GroupTypeEntity) => `${element.description}` },
      { columnDef: 'groupTerm',     header: 'Group Term',     cell: (element: GroupTypeEntity) => `${element.groupTerm}` },
      { columnDef: 'groupMemberTerm',   header: 'Group Member Term',   cell: (element: GroupTypeEntity) => `${element.groupMemberTerm}` },
      { columnDef: 'takesAttendance',    header: 'Takes Attendance',    cell: (element: GroupTypeEntity) => `${element.takesAttendance}` },
      { columnDef: 'isSystem', header: 'Is System', cell: (element: GroupTypeEntity) => `${element.isSystem}` },
      { columnDef: 'iconCssClass',     header: 'Icon CSS class',    cell: (element: GroupTypeEntity) => element.iconCssClass}
    ];

    this.buttons = [
      { icon: 'note_add',    payload: (element: GroupTypeEntity) => `${element.id}`, action: 'add', text: 'Add' },
      { icon: 'build',    payload: (element: GroupTypeEntity) => `${element.id}`, action: 'edit', text: 'Edit' },
      { icon: 'delete',    payload: (element: GroupTypeEntity) => `${element.id}`, action: 'delete', text: 'Remove' },
    ];
  }

}