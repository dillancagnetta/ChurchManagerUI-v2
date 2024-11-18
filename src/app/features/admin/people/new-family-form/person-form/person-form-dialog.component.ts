import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Person, PersonModel } from '../../people.model';
import { FamilyMember } from './person-form.model';
import { FormAction, FormActions } from '@shared/shared.models';

@Component( {
    selector: 'people-person-form-dialog',
    templateUrl: './person-form-dialog.component.html',
    //styleUrls: ['./person-form-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
} )
export class PersonFormDialogComponent
{
    action: FormAction | 'add_person';
    familyName: string;
    familyId?: number;
    person: Person;
    form: UntypedFormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<GroupAttendanceFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<PersonFormDialogComponent>,
        @Inject( MAT_DIALOG_DATA ) private _data: any,
        private _formBuilder: UntypedFormBuilder
    ) {
        // Set the defaults
        this.action = _data.action;
        this.familyName = _data['familyName'].replace('Family', '');

        if ( this.action === FormActions.Edit )
        {
            this.dialogTitle = 'Edit Person' + ` (${this.familyName})`;
            this.person = _data.person;
        } else
        {
            this.dialogTitle = 'New Person' + ` (${this.familyName})`;

            this.person = new PersonModel( {} );

            // Adding a Person to the Family
            if (this.action === 'add_person')
            {
                if(!_data['familyId'])
                {
                    throw new Error('familyId is required to add a person');
                }


                this.familyId = _data['familyId'];
            }
        }

        this.form = this.createForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create person form
     *
     * @returns {FormGroup}
     */
    createForm(): UntypedFormGroup
    {
        return this._formBuilder.group(
            {
            church: [1, Validators.required],
            connectionStatus: ['Member', Validators.required],
            source: ['Cell', Validators.required],
            firstVisitDate: [new Date()],
            person: [
                {
                    lastName: this.familyName
                },
                Validators.required
            ],
            assignedFollowUpPerson: [null]
        } );
    }

    addPerson(): void
    {
        const churchId = this.form.get( 'church' ).value;
        const {connectionStatus, source, firstVisitDate, person, assignedFollowUpPerson} = this.form.value;

        const model: FamilyMember = {
            churchId,
            familyId: this.familyId,
            connectionStatus,
            source,
            firstVisitDate,
            person,
            assignedFollowUpPerson
        };
        console.log(model);
        this.matDialogRef.close( model );
    }
}