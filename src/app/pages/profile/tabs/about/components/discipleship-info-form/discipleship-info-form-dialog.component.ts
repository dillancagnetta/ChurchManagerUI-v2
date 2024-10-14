import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Profile } from '../../../../profile.model';
import { FormAction, FormActions } from '@shared/shared.models';

@Component({
    selector     : 'profile-discipleship-info-form-dialog',
    templateUrl  : './discipleship-info-form-dialog.component.html',
    styleUrls    : ['./discipleship-info-form-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileDiscipleshipInfoFormDialogComponent implements OnInit
{
    action: FormAction;
    form: UntypedFormGroup;
    profile: Profile;
    dialogTitle: string;

    /**
     * Constructor
     *
     */
    constructor(
        public matDialogRef: MatDialogRef<ProfileDiscipleshipInfoFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: { action: FormAction, profile: Profile },
        private _formBuilder: UntypedFormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;
        this.profile = _data.profile;
        // We might support more actions in future
        if ( this.action === 'edit' )
        {
            this.dialogTitle = `Editing: ${this.profile.fullName.firstName} ${this.profile.fullName.lastName}`;
        }

        this.form = this.createForm();
    }

    ngOnInit(): void
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createForm(): UntypedFormGroup
    {
        return this._formBuilder.group({
            receivedHolySpirit: [this.profile.receivedHolySpirit],
            isBaptised: [this.profile.baptismStatus?.isBaptised],
            baptismDate: [this.profile.baptismStatus?.baptismDate],
            isCompleteFoundationSchool: [this.profile.foundationSchool?.isComplete],
            foundationSchoolDate: [this.profile.foundationSchool?.completionDate],
        });
    }
}
