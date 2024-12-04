import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild, input, inject, Signal, computed, effect
} from '@angular/core';
import {  MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {PAGING_SERVICE, TableBtn, TableColumn, TableConfig, TableQuery, TableToolbar} from '..';
import { PagedResult } from '@shared/data/pagination.models';
import { takeUntil, tap } from 'rxjs/operators';
import { IPaginatedTableService } from '@ui/components/general-table/paginated-general-table/paginated-general-table.service';
import { fuseAnimations } from '@fuse/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Subject } from 'rxjs';
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component( {
    selector: 'paginated-general-table',
    styleUrls: ['paginated-general-table.component.css'],
    templateUrl: 'paginated-general-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations   : fuseAnimations
} )
export class PaginatedGeneralTableComponent implements OnChanges, AfterViewInit, AfterContentInit
{
    debug = input<boolean>(false);
    // Single config input instead of multiple inputs
    config = input<TableConfig>();
    /*columns = input<TableColumn[]>([]);
    buttons = input<TableBtn[]>([]);
    toolbar = input<TableToolbar[]>([]);
    selectable = input<boolean>(false);
    drawerEnabled = input<boolean>(false);
    filter = input<boolean>(false);
    filterPlaceholder = input<string>('Filter results');
    footer = input<string>(null);
    pagination = input<number[]>([]);
    pageSize = input<number>(10);*/
    @Output() filteredData = new EventEmitter<any[]>();
    @Output() buttonClick = new EventEmitter<string[]>();

    // ContentChildren includes only elements that exists within the ng-content
    @ContentChild('query', { static: true }) tableQuery: TableQuery;

    // ViewChildren don’t include elements that exist within the ng-content tag.
    @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
    @ViewChild( MatSort, { static: true } ) sort: MatSort;

    private readonly _router = inject(Router);

    //displayedColumns: string[];
    displayedColumns: Signal<string[]> = computed(() => {
      const config = this.config();
      if (config) {
        let columns = config.columns.map(c => c.columnDef);
        if (config.buttons && config.buttons.length > 0)  columns = [...columns, 'actions'];
        if (config.selectable) columns = ['select', ...columns];
        return columns;
      }
    });

    page: PagedResult<any> = {totalResults: 0, totalPages: 0, data: []};
    selection = new SelectionModel<string>(true, []);
    resultsOnThisPage = [];


    // Private
    private _unsubscribeAll = new Subject();

    constructor(@Inject(PAGING_SERVICE) public service: IPaginatedTableService)
    {
        if ( !service )
        {
            throw new Error('PAGING_SERVICE has not been defined. Configure provider with injection token: PAGING_SERVICE');
        }

        this.service.page$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(page => this.page = page);

    }

    ngOnChanges( changes: SimpleChanges ): void
    {
       /* if(changes.columns)
        {
            this.displayedColumns = [...this.columns().map(c => c.columnDef)];
            if (this.buttons() && this.buttons().length > 0 ) this.displayedColumns = [...this.displayedColumns, 'actions'];
            if (this.selectable()) this.displayedColumns = ['select', ...this.displayedColumns];
        }*/
    }

    applyFilter( filterValue: string )
    {
    }

    ngAfterViewInit(): void
    {
        console.log('Paginator', this.paginator);
    }

    ngAfterContentInit(): void
    {
        const afterInitDatasource$ = this.tableQuery.query$
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(
                tap((query) =>  {
                    this.paginator.firstPage();
                    this.service.queryBy(query);
                })
            );

        afterInitDatasource$.subscribe();
    }



    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {

        const numSelected = this.resultsOnThisPage.length;

        // this is the list of items retrieved from the server for any single pagination event
        const numRows = this.page.resultsPerPage;
        //console.log(numSelected,numRows);

        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            (
                    this.resultsOnThisPage.length = 0,
                    this.page.data.forEach(
                        (row) => {
                            this.selection.deselect(row['id']);
                        }
                    )
            ):
            this.page.data.forEach(
                (row) => {
                    this.selection.select(row['id']);
                    this.resultsOnThisPage.push(row['id']);
                }
            );
    }


    select( id: string)
    {
        this.resultsOnThisPage.push(id);
    }

    logSelection()
    {
        console.log('selected', this.selection.selected);
    }

    fetch(pageIndex: number) {
        this.service.fetch(pageIndex);
        this.resultsOnThisPage.length = 0;
    }

    get hasTableToolbar(): boolean {
      return this.config().toolbar && this.config().toolbar.length > 0;
    }

    goTo(url: string) {
      this._router.navigateByUrl(url)
    }
}


