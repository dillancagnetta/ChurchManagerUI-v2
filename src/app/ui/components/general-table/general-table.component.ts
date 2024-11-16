import {Component, EventEmitter, input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {TableBtn, TableColumn, TableToolbar} from '.';
import { fuseAnimations } from '@fuse/animations';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'general-table',
  //styleUrls: ['general-table.component.css'],
  templateUrl: 'general-table.component.html',
  animations   : fuseAnimations
})
export class GeneralTableComponent implements OnChanges {
  columns = input<TableColumn[]>([]);
  buttons = input<TableBtn[]>([]);
  toolbar = input<TableToolbar[]>([]);
  data = input<any[]>([]);
  selectable = input<boolean>(false);
  showLoader = input<boolean>(false);
  isLoading= input<boolean>(false)
  drawerEnabled = input<boolean>(false);
  filter = input<boolean>(false);
  filterPlaceholder = input<string>('Filter');
  title = input<string>(null);
  footer = input<string>(null);
  pagination = input<number[]>([]);
  pageSize = input<number>();
  tableMinWidth = input<number>(500);
  @Output() filteredData = new EventEmitter<any[]>();
  @Output() buttonClick = new EventEmitter<string[]>();

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data()){
      if(changes.data){
        this.dataSource =  new MatTableDataSource(this.data()!);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.displayedColumns = [...this.columns().map(c => c.columnDef)];
        if (this.buttons() && this.buttons().length > 0 ) this.displayedColumns = [...this.displayedColumns, 'actions'];
        if (this.selectable()) this.displayedColumns = ['select', ...this.displayedColumns];
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredData.emit(this.dataSource.filteredData);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.dataSource.sort = this.sort;
  }

  get hasTableToolbar(): boolean {
    return this.toolbar() && this.toolbar().length > 0;
  }
}


