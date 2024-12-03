import {ChangeDetectionStrategy, Component, input, output} from "@angular/core";
import {FuseScrollbarModule} from "@fuse/directives/scrollbar";
import {GeneralTableModule} from "@ui/components/general-table/general-table.module";
import {TableBtn, TableColumn, TableToolbar} from "@ui/components/general-table";
import {ChurchEntity} from "@features/admin/churches/churches.model";

@Component({
  selector: 'church-list',
  templateUrl: './church-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FuseScrollbarModule,
    GeneralTableModule
  ],
  standalone: true
})
export class ChurchListComponent {
  columns: TableColumn[];
  buttons: TableBtn[] = [];
  toolbar: TableToolbar[] = [];

  $data = input.required<ChurchEntity[]>();
  addButtonClicked = output<any>();
  $isLoading = input<boolean>(false);

}