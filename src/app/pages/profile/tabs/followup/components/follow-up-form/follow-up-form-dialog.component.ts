import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {FormAction, FormActions} from "@shared/shared.models";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-follow-up-form',
  templateUrl: './follow-up-form-dialog.component.html',
  styleUrls: ['./follow-up-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowUpFormDialogComponent implements OnInit {

  form: UntypedFormGroup;
  action: FormAction;

  /**
   * Constructor
   */
  constructor(
    public matDialogRef: MatDialogRef<FollowUpFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { action: FormAction; },
    private _matDialog: MatDialog,
    private _formBuilder: UntypedFormBuilder
  ) {
    this.action = data.action;

    if (this.action === FormActions.New)
    {

    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.form = this._formBuilder.group({
      assignedDate: [new Date()], // only used on edit
      followUpType: [null, Validators.required],
      severity: [null, Validators.required],
      assignedPerson: [null, [Validators.required]],
      note: [null, [Validators.required]],
      additionalFollowUp: [null, [Validators.required]]
    });
  }

}
