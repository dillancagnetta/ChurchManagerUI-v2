import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from "@angular/core";
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormAction, FormActions} from "@shared/shared.models";
import {GroupTypeEntity} from "@features/admin/groupTypes/group-type.model";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {SharedModule} from "@shared/shared.module";
import {MatTooltip} from "@angular/material/tooltip";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'add-edit-group-type-dialog',
  standalone: true,
  templateUrl: './group-type-form-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    SharedModule,
    MatTooltip,
    MatCheckbox,
    MatError,
    MatFormField,
    MatInput,
    MatLabel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddGroupTypeDialogComponent {
  form: UntypedFormGroup;
  action: FormAction;

  // edit
  editEntity?: GroupTypeEntity;

  constructor(
    public matDialogRef: MatDialogRef<AddGroupTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { action: FormAction; entity?: GroupTypeEntity },
    private _formBuilder: FormBuilder)
  {
    this.action = data.action;

    if (this.action === FormActions.Edit) {
      this.editEntity = data.entity;
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.form = this._formBuilder.group({
      name: [this.editEntity?.name, Validators.required],
      description: [this.editEntity?.name],
      groupTerm: [this.editEntity?.groupTerm ?? 'group', Validators.required],
      groupMemberTerm: [this.editEntity?.groupMemberTerm ?? 'member', Validators.required],
      takesAttendance: [this.editEntity?.takesAttendance ?? false],
      isSystem: [this.editEntity?.isSystem ?? false],
      iconCssClass: [this.editEntity?.iconCssClass ?? 'heroicons_outline:volume-off']
    });
  }
}




