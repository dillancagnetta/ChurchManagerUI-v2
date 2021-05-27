import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
    GroupMemberEdit,
    GroupsDataService,
    GroupTypeRole,
    GroupWithChildren,
    NewGroupMemberForm
} from '@features/admin/groups';
import { Observable } from 'rxjs/internal/Observable';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    selector       : 'add-group-member-dialog',
    templateUrl    : './add-group-member-form-dialog.component.html',
    encapsulation  : ViewEncapsulation.None
})
export class AddGroupMemberFormDialogComponent implements OnInit, OnDestroy
{
    form: FormGroup;
    group: GroupWithChildren;
    groupMember: GroupMemberEdit
    action: string;
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
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.group = _data.group;
        this.action = _data.action;

        // If editing - begin the stream to load the group member details
        if (this.action === 'edit')
        {
            this.groupMemberId$.next(_data.groupMemberId)
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
        groupMemberData$.subscribe((groupMember: GroupMemberEdit) => {
                this.groupMember = groupMember;
                this.form.patchValue(groupMember);
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
        const {person, groupRole, communicationPreference, firstVisitDate} = this.form.value;

        const model: NewGroupMemberForm = {
            person, groupRole, communicationPreference, firstVisitDate,
            groupId: this.group.id
        };

        this.matDialogRef.close(['new', model]);
    }

    /**
     * Create form
     */
    private _createForm(): FormGroup
    {
        return this._formBuilder.group({
            person: [null, Validators.required],
            groupRole: [null, Validators.required],
            communicationPreference: ['Email', Validators.required],
            firstVisitDate: [null],
        });
    }
}