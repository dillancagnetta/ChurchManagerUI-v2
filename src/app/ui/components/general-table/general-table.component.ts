import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnChanges,
  output,
  Signal,
  signal,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TableBtn, TableColumn, TableConfig, TableToolbar} from '.';
import {fuseAnimations} from '@fuse/animations';
import {Router} from "@angular/router";

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
  // Single config input instead of multiple inputs
  config = input<TableConfig>();
  /*columns = input<TableColumn[]>([]);
  buttons = input<TableBtn[]>([]);
  toolbar = input<TableToolbar[]>([]);*/
  data = input<any[]>([]);
  isLoading= input<boolean>(false);
 /* selectable = input<boolean>(false);
  showLoader = input<boolean>(false);

  drawerEnabled = input<boolean>(false);
  filter = input<boolean>(false);
  filterPlaceholder = input<string>('Filter');
  title = input<string>(null);
  footer = input<string>(null);
  pagination = input<number[]>([]);
  pageSize = input<number>();
  tableMinWidth = input<number>(500);*/
  filteredData = output<any[]>();
  buttonClick = output<string[]>();

  //dataSource: MatTableDataSource<any>;
  dataSource = signal<MatTableDataSource<any>>(new MatTableDataSource([]));
  displayedColumns: Signal<string[]> = computed(() => {
    const config = this.config();
    if (config) {
      let columns = config.columns.map(c => c.columnDef);
      if (config.buttons && config.buttons.length > 0)  columns = [...columns, 'actions'];
      if (config.selectable) columns = ['select', ...columns];
      return columns;
    }
  });

  //displayedColumns: string[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private readonly _router = inject(Router);

  constructor() {
    // Effect to handle data changes (used to be in ngOnChanges)
    effect(() => {
      const data= this.data();
      if (data) {
        const datasource = new MatTableDataSource(data);
        datasource.sort = this.sort;
        datasource.paginator = this.paginator;
        this.dataSource.set(datasource);
      }
    }, {allowSignalWrites:true});
  }

  ngOnChanges(changes: SimpleChanges): void {
    /*if (this.data()){
      if(changes.data){
        this.dataSource =  new MatTableDataSource(this.data()!);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.displayedColumns = [...this.config().columns.map(c => c.columnDef)];
        if (this.config().buttons && this.config().buttons.length > 0 ) this.displayedColumns = [...this.displayedColumns, 'actions'];
        if (this.config().selectable) this.displayedColumns = ['select', ...this.displayedColumns];
      }
    }*/
  }

  applyFilter(filterValue: string) {
    this.dataSource().filter = filterValue.trim().toLowerCase();
    this.filteredData.emit(this.dataSource().filteredData);

    if (this.dataSource().paginator) {
      this.dataSource().paginator.firstPage();
    }

    this.dataSource().sort = this.sort;
  }

  get hasTableToolbar(): boolean {
    return this.config().toolbar && this.config().toolbar.length > 0;
  }

  goTo(url: string) {
    this._router.navigateByUrl(url)
  }
}


