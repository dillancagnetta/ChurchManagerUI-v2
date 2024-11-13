import {Component, inject} from "@angular/core";
import {GroupTypesListComponent} from "@features/admin/groupTypes/_ui/group-types-list/group-types-list.component";
import {GroupTypesStore} from "@features/admin/groupTypes/group-types.store";
import {MatDialog} from "@angular/material/dialog";
import {ButtonActions, FormAction, FormActions} from "@shared/shared.models";
import {
  AddGroupTypeDialogComponent
} from "@features/admin/groupTypes/_ui/group-type-forms/group-type-form-dialog.component";
import {filter} from "rxjs/operators";
import {GroupTypeEntity} from "@features/admin/groupTypes/group-type.model";
import {FuseConfirmationService} from "@fuse/services/confirmation";

@Component({
  templateUrl: './group-types.component.html',
  standalone: true,
  imports: [
    GroupTypesListComponent
  ],
  providers:[]
})
export class GroupTypesComponent {

  private readonly _store = inject(GroupTypesStore);
  private readonly _matDialog = inject(MatDialog);
  private readonly _confirmation= inject(FuseConfirmationService);

  $data = this._store.items;
  $loading = this._store.loading;
  $selected = this._store.selected;

  onButtonClicked(event: string[]) {
    console.log('onButtonClicked', event);
    let dialogRef: any;
    let action: FormActions;
    let data: { action: FormAction; entity?: GroupTypeEntity };

    // e.g ['edit', '2']
    const actionBtn = event[0];
    const id = Number.parseInt(event[1]);

    switch (actionBtn) {
      case ButtonActions.Delete:
        this.delete(id)
        break;

      case ButtonActions.Add:
        data = {
          action: FormActions.New
        }
        break;

      case ButtonActions.Edit:
        this._store.setSelected(id);

        data = {
          action: FormActions.Edit,
          entity: this.$selected()
        }
        break;
    }

    if (data?.action === FormActions.New || data?.action === FormActions.Edit) {
      // Open the dialog
      dialogRef = this._matDialog.open(AddGroupTypeDialogComponent, {
        panelClass: 'form-dialog',
        data
      });

      // After dialog is closed
      dialogRef.afterClosed()
        .pipe(filter(result => !!result))
        .subscribe(([action, form]: [FormAction, GroupTypeEntity]) => {
          // Create item
          if (action === FormActions.New) {
            this._store.addItem(form);
          }

          // Update item
          if (action === FormActions.Edit) {
            this._store.update(form);
          }
        });
    }
  }

  delete(groupTypeId: number) {
    const confirmation = this._confirmation.delete();

    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {
      // If the confirm button pressed...
      if ( result === 'confirmed' )
      {
        this._store.deleteItem(groupTypeId);
      }
    });
  }
}