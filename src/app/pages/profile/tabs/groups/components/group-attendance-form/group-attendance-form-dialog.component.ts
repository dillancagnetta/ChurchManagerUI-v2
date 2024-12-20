import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, first, map } from 'rxjs/operators';
import { Moment } from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { fuseAnimations } from '@fuse/animations';
import { Group, GroupAttendanceForm, GroupMemberSimple, GroupsDataService } from '@features/admin/groups';

@Component({
    selector     : 'profile-groups-attendance-form-dialog',
    templateUrl  : './group-attendance-form-dialog.component.html',
    styleUrls    : ['./group-attendance-form-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class GroupAttendanceFormDialogComponent implements OnInit
{
    form: UntypedFormGroup;
    group: Group;

    didNotOccur$: Observable<boolean>;

    private readonly _phoneNumberPattern = '^((?:\\+27|27)|0)([0-9]{2})(\\d{7})$';
    private readonly _numbersOnlyPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';

    /**
     * Constructor
     *
     * @param {MatDialogRef<GroupAttendanceFormDialogComponent>} matDialogRef
     * @param _data
     * @param {GroupsDataService} _groupsData
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<GroupAttendanceFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _groupsData: GroupsDataService,
        private _formBuilder: UntypedFormBuilder
    )
    {
        this.group = _data.group;
    }

    ngOnInit(): void
    {
        this.form = this.createForm();

        // Fetch group members and update form controls
        this._groupsData.getGroupMembers$(this.group.groupId)
            .pipe(first())
            .subscribe(members => {
                this.updateGroupMembersForm(members);
            });

        this.didNotOccur$ = this.didNotOccurControl
            .valueChanges
            .pipe(
                distinctUntilChanged(),
                map(didNotOccur => didNotOccur)
            );
    }

    /**
     * Create attendance form
     *
     * @returns {FormGroup}
     * https://netbasal.com/angular-reactive-forms-the-ultimate-guide-to-formarray-3adbe6b0b61a
     */
    private createForm(): UntypedFormGroup
    {
        return this._formBuilder.group({
            attendanceDate: [null, Validators.required],
            didNotOccur: [false],
            members: this._formBuilder.array([]),
            firstTimers: this._formBuilder.array([]),
            offering   : [0, Validators.pattern(this._numbersOnlyPattern)],
            note   : [null]
        });
    }

    /*
    *  Updates the members form array with the actual member data populated
    *
    *  https://stackoverflow.com/questions/46495204/angular-formarray-patchvalue-error-typeerror-value-foreach-is-not-a-function
    */
    private updateGroupMembersForm(members: GroupMemberSimple[]): void
    {
        const membersControl =  this._formBuilder.array([]);

        members.forEach(member => {
            membersControl.push(this.newGroupMemberControl(member));
        });

        this.form.setControl('members', membersControl);
    }

    // Creates a new Group Member Form Array item
    private newGroupMemberControl(member: GroupMemberSimple): AbstractControl {
        return this._formBuilder.group({
            groupMemberId: [member.groupMemberId],
            groupMemberName: [`${member.firstName } ${member.lastName }`],
            groupMemberDidAttend   : [false],
            receivedHolySpirit   : [false],
            newConvert   : [false],
        });
    }

    // Creates a new First Timer / Visitor Form Array item
    private newFirstTimerControl(): AbstractControl {
        return this._formBuilder.group({
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            gender: [null, Validators.required],
            ageClassification: ['Adult', Validators.required],
            phoneNumber: [null, [Validators.required, Validators.pattern(this._phoneNumberPattern)]],
            receivedHolySpirit   : [false],
            newConvert   : [false]
        });
    }

    // Adds a new First Timer / Visitor Form Array item
    public addFirstTimerControl(): void {
        this.firstTimersFormArray.push(this.newFirstTimerControl());
    }

    removeFirstTimerControl(index: number): void {
        this.firstTimersFormArray.removeAt(index);
    }

    /*
     * Access to the Groups Members Form item
     */
    public get groupMembersFormArray(): UntypedFormArray {
        return this.form.get('members') as UntypedFormArray;
    }

    public get didNotOccurControl(): UntypedFormArray {
        return this.form.get('didNotOccur') as UntypedFormArray;
    }

    /*
    * Access to the Groups Members Form item
    */
    public get firstTimersFormArray(): UntypedFormArray {
        return this.form.get('firstTimers') as UntypedFormArray;
    }

    public save() {
        const attendanceDateMoment = this.form.get('attendanceDate').value as Moment;

        const model: GroupAttendanceForm = {
            groupId: this.group.groupId,
            attendanceDate: attendanceDateMoment.format('YYYY-MM-DD'),
            didNotOccur: this.form.get('didNotOccur').value,
            members: this.form.get('members').dirty ? this.form.get('members').value : [],
            firstTimers: this.form.get('firstTimers').value,
            offering:  this.form.get('offering').value,
            notes:  this.form.get('note').value
        };

        this.matDialogRef.close(model);
    }
}
