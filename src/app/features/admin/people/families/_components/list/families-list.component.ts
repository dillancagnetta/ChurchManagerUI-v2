import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { TableBtn, TableColumn } from '@ui/components/general-table';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FamiliesDataService, Family, pagingServiceProvider } from '@features/admin/people/families';
import { PersonFormDialogComponent } from '@features/admin/people/new-family-form/person-form/person-form-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { FamilyMember } from '@features/admin/people/new-family-form/person-form/person-form.model';
import { FamiliesService } from '@features/admin/people/families/_services/families.service';

@Component({
    selector       : 'families',
    templateUrl    : './families-list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [pagingServiceProvider]
})
export class FamiliesListComponent implements OnInit
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

    drawerMode: 'over' | 'side';

    // View Variables
    groupId: number | undefined;
    viewMode: 'all' | 'group' = 'all';

    // Table definitions
    columns: TableColumn[];
    buttons: TableBtn[] = [];

    dialogRef: any;


    // Private
    private _unsubscribeAll = new Subject();
    private _fetchFamilyTrigger = new BehaviorSubject<number>(null);
    private _family$: Observable<Family>;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _matDialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _service: FamiliesService,
        private _data: FamiliesDataService,
    )
    {
        this.columns = [
            { columnDef: 'name',     header: 'Name',     cell: (element: Family) => `${element.name}` },
            { columnDef: 'city',     header: 'City',     cell: (element: Family) => `${element.city}` },
            { columnDef: 'country',   header: 'Country',   cell: (element: Family) => `${element.country}` }
        ];

        this.buttons = [
            { icon: 'note_add',    payload: (element: Family) => `${element.id}`, action: 'add', text: 'Add Person', disabled: false },
        // { icon: 'build',    payload: (element: Family) => `${element.id}`, action: 'edit', text: 'Edit' },
            { icon: 'delete',    payload: (element: Family) => `${element.id}`, action: 'delete', text: 'Remove', disabled: true },
        ];
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

        this._family$ = this._fetchFamilyTrigger
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(filter(familyId => !!familyId))
            .pipe(
                switchMap(familyId => this._service.getById$(familyId))
            );
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

        /**
         * Add Person to Family
         */
        if (action[0] === 'add') {

            const familyId = +action[1];
            this._fetchFamilyTrigger.next(familyId);

            this._family$
                .pipe(filter(family => !!family))
                .pipe(first()) // <-- completes the observable and unsubscribes,
                .pipe(
                    switchMap((family: Family)  => {
                        this.dialogRef = this._matDialog.open(PersonFormDialogComponent, {
                            panelClass: 'person-form-dialog',
                            data      : {
                                action: 'add_person',
                                familyName: family.name,
                                familyId: family.id
                            }
                        });

                        return  this.dialogRef.afterClosed()
                            .pipe(
                                switchMap((response: FamilyMember) => {
                                    if (!response )
                                    {
                                        return EMPTY;
                                    }

                                     // Do something here
                                    console.log(response);

                                    return this._data.addPerson(response);
                                })
                            );
                    })
                ).subscribe();
        }

        /**
         * Go to detail
         */
        if (action[0] === 'drawer') {
            const id =  action[1];
            console.log('drawer click', 'id', id);
            // Go to detail
            this._router.navigate(
                ['/apps/people/families/list/', id],
                { queryParams: { groupId: this.groupId } });

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }
    }
}