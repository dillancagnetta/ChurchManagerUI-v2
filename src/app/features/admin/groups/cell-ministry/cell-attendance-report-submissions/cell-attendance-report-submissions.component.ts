import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal, ViewEncapsulation} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { CellMinistryDataService } from '@features/admin/groups/cell-ministry/_services/cell-ministry-data.service';
import {createTableConfig, TableColumn, TableConfig} from '@ui/components/general-table';
import { AttendanceReportSubmission } from '@features/admin/groups/cell-ministry/cell-ministry.model';
import { indicate } from '@shared/data/paginated.data-source';
import { ActivatedRoute, Params } from '@angular/router';
import {Family} from "@features/admin/people/families";

@Component({
    selector     : 'cell-attendance-report-submissions',
    templateUrl  : './cell-attendance-report-submissions.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellAttendanceReportSubmissionsComponent implements OnInit, OnDestroy
{
    searchForm: UntypedFormGroup;
    searchBtnClicked = new Subject();

    // View data
    attendanceReportSubmissions$ = this._data.attendanceReportSubmissions$;
    loading$ = new Subject<boolean>();
    columns: TableColumn[] = [
      // { columnDef: 'id',    header: 'Id',    cell: (element: AttendanceReportSubmission) => `${element.id}` },
      { columnDef: 'name',     header: 'Name',     cell: (element: AttendanceReportSubmission) => `${element.name}` },
      { columnDef: 'leader',     header: 'Leader',     cell: (element: AttendanceReportSubmission) => `${element.leader.personName}` },
    ];

    $noReportsTableConfig = signal<TableConfig>(createTableConfig({
      columns: this.columns,
      filter: true,
      title: 'Groups Without Reports'
    }));

    $reportsTableConfig = signal<TableConfig>(createTableConfig({
      columns: this.columns,
      filter: true,
      title: 'Groups With Reports'
    }));

    // Private
    private _queryParams: Params;
    private _unsubscribeAll = new Subject();

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _data: CellMinistryDataService
    ){
        this.searchForm = this._formBuilder.group({
            church: [null, [Validators.required]],
            period: [null, [Validators.required]]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        const query$ = this.searchBtnClicked
            .pipe(
                filter( () =>  this.searchForm.valid),
                takeUntil(this._unsubscribeAll),
                map( (_) => {
                    const {church, period} = this.searchForm.value;
                    return {church, period};
                })
            );

        const fetchDataOnQueryChange$ = query$
            .pipe(
                switchMap(query => this._data.getAttendanceReportSubmissions$(query.church, query.period)
                    .pipe(indicate(this.loading$))
                )
            );

        fetchDataOnQueryChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe();

        // Subscribe to query params change
        this._activatedRoute.queryParams
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((queryParams) => {
                // Store the query params
                this._queryParams = queryParams;

                // Fill the form with the values from query
                // params without emitting any form events
                this.searchForm.patchValue({
                    church: +(queryParams?.church ?? NaN), // safe convert string to number
                    period: +(queryParams?.period ?? NaN), // safe convert string to number
                }, {emitEvent: false});

                // Trigger search if the form is completely valid
                if (this.searchForm.valid && queryParams?.church && queryParams?.period) {
                    this.searchBtnClicked.next(true);
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next({});
        this._unsubscribeAll.complete();
    }
}
