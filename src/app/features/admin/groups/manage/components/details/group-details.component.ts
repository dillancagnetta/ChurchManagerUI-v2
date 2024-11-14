import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation, input } from '@angular/core';
import { GroupWithChildren } from '@features/admin/groups';
import {MatDialog} from '@angular/material/dialog';
import { GroupDetailDialogComponent } from '@features/admin/groups/manage/components/group-detail/group-detail-dialog.component';
import { filter } from 'rxjs/operators';
import { EditGroupForm, NewGroupForm } from '@features/admin/groups/manage/components/group-detail/group-detail.model';
import { FormAction, FormActions } from '@shared/shared.models';

@Component({
    selector       : 'group-details',
    templateUrl    : './group-details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupDetailsComponent
{
    group = input<GroupWithChildren>();
    expanded = input(true);
    @Output() editedGroup = new EventEmitter<EditGroupForm>();

    constructor(private _matDialog: MatDialog)
    {
    }

    /**
     * Open edit group dialog
     */
    openEditGroup()
    {
        // Open the dialog
        const dialogRef = this._matDialog.open(GroupDetailDialogComponent, {
          panelClass: 'form-dialog',
            data : {
                action: FormActions.Edit,
                group: this.group()
            }
        });

        dialogRef.afterClosed()
            .pipe(filter(result => !!result))
            .subscribe(([action, group]: [FormAction, EditGroupForm]) => {
                // Signal the added group details
                console.log('openEditGroup', action, group);
                if (action === FormActions.Edit) {
                    this.editedGroup.emit(group);
                }
            });
    }
}