import { NgModule } from '@angular/core';
import { PersonFormDialogComponent } from '@features/admin/people/new-family-form/person-form/person-form-dialog.component';
import { FuseAutogrowModule } from '@fuse/directives/autogrow';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { SharedModule } from '@shared/shared.module';
import { AddressEditorControlModule } from '@ui/controls/address-editor-control/address-editor-control.module';
import { PersonEditorControlModule } from '@ui/controls/person-editor-control/person-editor-control.module';
import { PersonAutocompleteControlModule } from '@ui/controls/person-autocomplete-control/person-autocomplete-control.module';
import { FullNamePipeModule } from '@shared/pipes/fullname/full-name-pipe.module';
import { AgePluralizeModule } from '@shared/pipes/age/age-pluralize.module';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatRippleModule } from '@angular/material/core';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

@NgModule({
    declarations: [
        PersonFormDialogComponent
    ],
    imports:[
        MatAutocompleteModule,
        MatButtonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatMomentDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatStepperModule,
        MatTableModule,
        MatButtonToggleModule,
        MatToolbarModule,
        MatTooltipModule,

        // Fuse
        FuseAutogrowModule,
        FuseScrollbarModule,
        FuseFindByKeyPipeModule,
        SharedModule,

        // Controls
        AddressEditorControlModule,
        PersonEditorControlModule,
        PersonAutocompleteControlModule,

        // Extensions
        FullNamePipeModule,
        AgePluralizeModule
    ],
    providers: [ ],
    exports: [PersonFormDialogComponent]
})
export class PersonFormModule
{
}