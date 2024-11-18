import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { BehaviorSubject, Subject } from 'rxjs';
import { filter, first, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';

import { Profile, ProfileGeneralInfo, ProfilePersonalInfo, History } from '../../profile.model';
import { ProfileService } from '../../_services/profile.service';
import {
    ProfileConnectionInfoFormDialogComponent,
    ProfileDiscipleshipInfoFormDialogComponent,
    ProfileGeneralInfoFormDialogComponent,
    ProfilePersonalInfoFormDialogComponent
} from './components';
import {ActivatedRoute, Router} from '@angular/router';
import { FormActions } from '@shared/shared.models';
import {DateTime} from "rrule/dist/esm/datetime";

@Component({
    selector       : 'profile-main',
    templateUrl    : './profile-about.component.html',
    encapsulation  : ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileAboutComponent implements OnInit, OnDestroy
{
    profile$ = new BehaviorSubject<Profile>(null);

    dialogRef: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        private readonly _profileService: ProfileService,
        private readonly _matDialog: MatDialog
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._profileService.profile$
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(tap(profile => this.profile$.next(profile)))
            .subscribe();
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

    // -----------------------------------------------------------------------------------------------------
    // @ Edit Profile Dialogs
    // -----------------------------------------------------------------------------------------------------

    onEditGeneralInfo(): void
    {
        this.dialogRef = this._matDialog.open(ProfileGeneralInfoFormDialogComponent, {
            panelClass: 'general-info-form-form-dialog',
            data : {
                action: FormActions.Edit,
                profile: this.profile$.getValue()
            }
        });

        const afterClosed$ = this.dialogRef.afterClosed()
            .pipe(withLatestFrom(this.profile$))
            .pipe(
                filter(([response, _]) => !!response), // <-- only "truthy" results pass same as if(result)
                first(), // <-- completes the observable and unsubscribes,
                switchMap(([response, profile]: [any, Profile]) => {
                    const actionType: string = response[0];
                    const formData: ProfileGeneralInfo = response[1];
                    switch ( actionType )
                    {
                        /**
                         * Save
                         */
                        case 'save':
                            const model: ProfileGeneralInfo = formData;
                            console.log(model);
                            return this._profileService.editGeneralInfo$(profile.personId, model)
                                .pipe(
                                    map(_ => profile)
                                );
                    }
                })
            );

        afterClosed$
            .pipe(
                switchMap((profile: Profile) => {
                    // Calls the endpoint to update the profile
                    return this._profileService.getUserProfile$(+profile.personId);
                } ))
            .subscribe(
            value => {},
            error => {},
            () => console.log('GeneralInfo completed')
        );
    }

    onEditPersonalInfo(): void
    {
        this.dialogRef = this._matDialog.open(ProfilePersonalInfoFormDialogComponent, {
            panelClass: 'personal-info-form-form-dialog',
            data : {
                action: 'edit',
                profile: this.profile$.getValue()
            }
        });

        const afterClosed$ =  this.dialogRef.afterClosed()
            .pipe(withLatestFrom(this.profile$))
            .pipe(
                filter(([response, _]) => !!response), // <-- only "truthy" results pass same as if(result)
                first(), // <-- completes the observable and unsubscribes,
                switchMap(([response, profile]: [any, Profile]) => {
                    const actionType: string = response[0];
                    const formData: UntypedFormGroup = response[1];
                    switch ( actionType )
                    {
                        /**
                         * Save
                         */
                        case 'save':
                            const model: ProfilePersonalInfo = formData.getRawValue();
                            return this._profileService.editPersonalInfo$(profile.personId, model)
                                .pipe(
                                    map(_ => ({profile, model}))
                                );
                    }
                })
            );

        afterClosed$.subscribe(
            ( { profile, model }) => {
                Object.assign(profile.fullName, model);
                profile.gender = model.gender;
                profile.ageClassification = model.ageClassification;
                this.profile$.next(profile);
            },
            error => {},
            () => console.log('PersonalInfo completed')
        );
    }

    onEditConnectionsInfo(): void {
        this.dialogRef = this._matDialog.open(ProfileConnectionInfoFormDialogComponent, {
            panelClass: 'connection-info-form-form-dialog',
            data : {
                action: 'edit',
                profile: this.profile$.getValue()
            }
        });

        const afterClosed$ =  this.dialogRef.afterClosed()
            .pipe(withLatestFrom(this.profile$))
            .pipe(
                filter(([response, _]) => !!response), // <-- only "truthy" results pass same as if(result)
                first(), // <-- completes the observable and unsubscribes,
                switchMap(([response, profile]: [any, Profile]) => {
                    const actionType: string = response[0];
                    const formData: UntypedFormGroup = response[1];
                    switch ( actionType )
                    {
                        /**
                         * Save
                         */
                        case 'save':
                            return this._profileService.editConnectionInfo$(profile.personId, formData.getRawValue())
                                .pipe(
                                    map(_ => profile)
                                );
                    }
                })
            );

        afterClosed$
            .pipe(
                switchMap((profile: Profile) => {
                    // Calls the endpoint to update the profile
                    return this._profileService.getUserProfile$(+profile.personId);
                } ))
            .subscribe(
                value => {},
            error => {},
            () => console.log('ConnectionInfo completed')
        );
    }

    onEditDiscipleshipInfo()
    {
        this.dialogRef = this._matDialog.open(ProfileDiscipleshipInfoFormDialogComponent, {
            panelClass: 'discipleship-info-form-form-dialog',
            data : {
                action: FormActions.Edit,
                profile: this.profile$.getValue()
            }
        });

        const afterClosed$ =  this.dialogRef.afterClosed()
            .pipe(withLatestFrom(this.profile$))
            .pipe(
                filter(([response, _]) => !!response), // <-- only "truthy" results pass same as if(result)
                first(), // <-- completes the observable and unsubscribes,
                switchMap(([response, profile]: [any, Profile]) => {
                    const actionType: string = response[0];
                    const formData: UntypedFormGroup = response[1];
                    switch ( actionType )
                    {
                        /**
                         * Save
                         */
                        case 'save':
                            return this._profileService.editDiscipleshipInfo$(profile.personId, formData.getRawValue())
                                .pipe(
                                    map(_ => profile)
                                );
                    }
                })
            );

        afterClosed$
            .pipe(
                switchMap((profile: Profile) => {
                    // Calls the endpoint to update the profile
                    return this._profileService.getUserProfile$(+profile.personId);
                } ))
            .subscribe(
                value => {},
                error => {},
                () => console.log('Discipleship completed')
            );
    }


    /**
     * Returns whether the given dates are different days
     *
     * @param currentDateStr
     * @param nextDateStr
     */
    isSameDay(currentDateStr: string, nextDateStr: string): boolean {
      const current = new Date(currentDateStr);
      const compare = new Date(nextDateStr);

      return current.getFullYear() == compare.getFullYear() &&
        current.getMonth() == compare.getMonth() &&
        current.getDay() == compare.getDay()
    }

    goToRelatedRecord(activity: History): string {
      const url = activity.verb == 'ADDEDTOGROUP' ? '/apps/groups/'+ activity.relatedEntityId : '';
      return url;
    }
}
