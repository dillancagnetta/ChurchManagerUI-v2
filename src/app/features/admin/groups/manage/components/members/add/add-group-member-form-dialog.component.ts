import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { GroupMemberForm, GroupsDataService, GroupTypeRole, GroupWithChildren } from '@features/admin/groups';
import { Observable } from 'rxjs/internal/Observable';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { containsIdValidation } from '@shared/validators/common-forms.validators';
import { FormAction, FormActions } from '@shared/shared.models';

@Component({
    selector       : 'add-group-member-dialog',
    templateUrl    : './add-group-member-form-dialog.component.html',
    encapsulation  : ViewEncapsulation.None
})
export class AddGroupMemberFormDialogComponent implements OnInit, OnDestroy
{
    form: UntypedFormGroup;
    group: GroupWithChildren;
    groupMember: GroupMemberForm = null;
    action: FormAction;
    // Streams
    groupMemberId$ = new BehaviorSubject<number>(null);
    groupRoles$: Observable<GroupTypeRole[]>;
    // Private
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     *
     */
    constructor(
        public matDialogRef: MatDialogRef<AddGroupMemberFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _groupsData: GroupsDataService,
        private _formBuilder: UntypedFormBuilder
    )
    {
        // Set the defaults
        this.group = _data.group;
        this.action = _data.action;

        // If editing - begin the stream to load the group member details
        if (this.action === FormActions.Edit)
        {
            this.groupMemberId$.next(_data.groupMemberId);
        }
    }

    ngOnInit(): void
    {
        // Create the form
        this.form = this._createForm();

        // Get specific group roles for this group
        this.groupRoles$ = this._groupsData.getGroupRoles$(this.group.groupType.id);

        // Get the member data if we are editing
        const groupMemberData$ = this.groupMemberId$
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(filter(value => !!value))
            .pipe(switchMap(groupMemberId => this._groupsData.getGroupMember$(groupMemberId)));

        // Update the form with edited member
        groupMemberData$.subscribe((groupMember: GroupMemberForm) => {
                this.groupMember = groupMember;
                this.form.patchValue(groupMember, {emitEvent: false});
            }
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    add(): void
    {
        const model = this.groupMemberForm;

        this.matDialogRef.close([FormActions.New, model]);
    }

    /**
     * Build and return GroupMemberForm
     */
    get groupMemberForm(): GroupMemberForm
    {
        const {person, groupRole, communicationPreference, firstVisitDate,recordStatus} = this.form.value;

        return {
            person, groupRole, communicationPreference, firstVisitDate, recordStatus,
            groupId: this.group.id,
            groupMemberId: this.groupMember?.groupMemberId
        };
    }

    /**
     * Create form
     */
    private _createForm(): UntypedFormGroup
    {
        return this._formBuilder.group({
            person: [null, [Validators.required, containsIdValidation]],
            groupRole: [null, Validators.required],
            recordStatus: ['Active', Validators.required],
            communicationPreference: ['Email', Validators.required],
            firstVisitDate: [null],
        });
    }

    update()
    {
        const model = this.groupMemberForm;

        this.matDialogRef.close([FormActions.Edit, model]);
    }
}