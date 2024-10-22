import {Component, inject, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {MatDialog} from "@angular/material/dialog";
import {FollowUpFormDialogComponent} from "./components/follow-up-form/follow-up-form-dialog.component";
import {FormAction, FormActions} from "@shared/shared.models";
import {filter} from "rxjs";

@Component({
  selector: 'profile-follow-up',
  templateUrl: './follow-up.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProfileFollowUpComponent {
  private readonly _matDialog: MatDialog = inject(MatDialog);

  /**
   * Open new group dialog
   */
  openAddFollowUpDialog() {
    // Open the dialog
    const dialogRef = this._matDialog.open(FollowUpFormDialogComponent, {
      data: {
        action: FormActions.New
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(([action, form]: [FormAction, any]) => {

        console.log('followUp Dialog', action, form)
        if (action === FormActions.New) {
          // this.addedGroup.emit(group);
        }
      });
  }
}