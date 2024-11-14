import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormAction, FormActions } from '@shared/shared.models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { missionCategoryList , missionTypes} from '@features/admin/missions';
import moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component( {
    selector: 'missions-add-dialog',
    templateUrl: './missions-create-dialog.component.html',
    encapsulation: ViewEncapsulation.None
} )
export class MissionsCreateDialogComponent implements OnInit
{
    action: FormAction;
    dialogTitle: string;
    missionStreamCtrl  = new UntypedFormControl('Group');
    form: UntypedFormGroup;

    missionTypes = missionTypes;
    categoryList = missionCategoryList;

    private readonly _destroyed$: Subject<void> = new Subject();
    private readonly _numbersOnlyPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';

    constructor(
        public matDialogRef: MatDialogRef<MissionsCreateDialogComponent>,
        @Inject( MAT_DIALOG_DATA ) private _data: any,
        private _formBuilder: UntypedFormBuilder
    ) {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === FormActions.New)
        {
            this.dialogTitle = 'New Mission: ' + this.missionStreamCtrl.value;
        }

        this.form = this.createForm();
    }

    ngOnInit(): void
    {
        this.missionStreamCtrl
            .valueChanges
            .pipe(takeUntil(this._destroyed$))
            .subscribe(value => this.dialogTitle = 'New Mission: ' + value);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create mission form
     *
     * @returns {FormGroup}
     */
    createForm(): UntypedFormGroup
    {
        return this._formBuilder.group(
            {
                name: [null, Validators.required],
                description: [null],
                type: [null, Validators.required],
                category: [null, Validators.required],
                church: [null],
                churchGroup: [null], // Group selection
                person: [null],
                startDate: [moment(), Validators.required],
                endDate: [null],

                attendance:  this._formBuilder.group({
                    attendanceCount: [null, Validators.pattern(this._numbersOnlyPattern)],
                    firstTimerCount: [null, Validators.pattern(this._numbersOnlyPattern)],
                    newConvertCount: [null, Validators.pattern(this._numbersOnlyPattern)],
                    receivedHolySpiritCount: [null, Validators.pattern(this._numbersOnlyPattern)],
                })
            } );
    }

    add()
    {
        const {name, description, type, category, church: churchId, churchGroup, person, startDate: startDateTime, endDate: endDateTime, attendance }  = this.form.value;

        const model = {
            name,
            description,
            type,
            category,
            churchId,
            groupId: churchGroup?.groupId,
            personId: person?.id,
            startDateTime,
            endDateTime,
            attendance
        };

        console.log('create mission', model);
        this.matDialogRef.close(model);
    }
}