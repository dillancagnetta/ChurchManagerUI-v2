import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit, signal,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { pagingServiceProvider } from '@features/admin/missions/_components/list/missions-list-paging.providers';
import {createTableConfig, TableBtn, TableColumn, TableConfig} from '@ui/components/general-table';
import { parseLocalDate } from '@core/date-utils';
import { Mission } from '@features/admin/missions';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {FollowUpRecord} from "../../../../../pages/profile/tabs/followup/follow-up.models";

@Component({
    selector       : 'missions',
    templateUrl    : './missions-list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [pagingServiceProvider]
})
export class MissionsListComponent implements OnInit
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

    drawerMode: 'over' | 'side';

    // View Variables
    groupId: number | undefined;
    viewMode: 'all' | 'group' = 'all';

    // Table definitions
    $tableConfig = signal<TableConfig>(createTableConfig({
      columns: [
        { columnDef: 'startDateTime',     header: 'Assigned Date',    cell: (element: Mission) => {
            return parseLocalDate(element.startDateTime);
          } },
        { columnDef: 'type',     header: 'Type',     cell: (element: Mission) => `${element.type}` },
        { columnDef: 'category',   header: 'Category',   cell: (element: Mission) => `${element.category}` },
        { columnDef: 'stream',   header: 'Stream',   cell: (element: Mission) => `${element.stream}` },
        { columnDef: 'attendanceCount',   header: 'Attendance',   cell: (element: Mission) => `${element.attendance?.attendanceCount}` },
        { columnDef: 'firstTimerCount',   header: 'First Timers',   cell: (element: Mission) => `${element.attendance?.firstTimerCount}` },
        { columnDef: 'newConvertCount',   header: 'New Converts',   cell: (element: Mission) => `${element.attendance?.newConvertCount}` },
        { columnDef: 'receivedHolySpiritCount',   header: 'Holy Spirit',   cell: (element: Mission) => `${element.attendance?.receivedHolySpiritCount}` },
      ],
      buttons: [
        { icon: 'note_add',    payload: (element: Mission) => `${element.id}`, action: 'add', text: 'Add' },
        { icon: 'build',    payload: (element: Mission) => `${element.id}`, action: 'edit', text: 'Edit' },
        { icon: 'delete',    payload: (element: Mission) => `${element.id}`, action: 'delete', text: 'Remove' },
      ]
    }));

    // Private
    private _unsubscribeAll = new Subject();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    )
    {
    }

    ngOnInit(): void
    {
        // Try extract groupId from query string (can be undefined)
        const groupIdParam$ = this._activatedRoute.queryParams
            .pipe(map(({groupId}) => groupId))
            .pipe(filter(groupId => groupId)); // skips when not present

        // Update controls based on mode
        groupIdParam$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe();

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {
                // Set the drawerMode if the given breakpoint is active
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                }
                else
                {
                    this.drawerMode = 'over';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onBackdropClicked(): void {
        // Go back to the list
        this._router.navigate(['./'],
            {
                relativeTo: this._activatedRoute,
                queryParams: { groupId: this.groupId }
            });
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    onButtonClicked(action: string[])
    {
        console.log('button clicked: ',  action);

        if (action[0] === 'add') {

        }

        /**
         * Go to detail
         */
        if (action[0] === 'drawer') {
            const id =  action[1];
            console.log('drawer click', 'id', id);
            // Go to detail
            this._router.navigate(
                ['/apps/missions/list/', id],
                { queryParams: { groupId: this.groupId } });

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }
    }
}