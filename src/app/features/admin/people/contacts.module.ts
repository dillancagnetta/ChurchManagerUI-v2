import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MAT_DATE_FORMATS, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import * as moment from 'moment';
import { FuseAutogrowModule } from '@fuse/directives/autogrow';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { SharedModule } from '@shared/shared.module';
import { contactsRoutes } from './contacts.routing';
import { ContactsComponent } from './contacts.component';
import { ContactsDetailsComponent } from './details/details.component';
import { ContactsListComponent } from './list/list.component';
import { PersonFormDialogComponent } from '@features/admin/people/new-family-form/person-form/person-form-dialog.component';
import { NewFamilyFormComponent } from '@features/admin/people/new-family-form/new-family-form.component';
import { FamilyMembersListComponent } from '@features/admin/people/new-family-form/family-members-list/family-members-list.component';
import { PeopleDataService } from '@features/admin/people/_services/people-data.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { AddressEditorControlModule } from '@ui/controls/address-editor-control/address-editor-control.module';
import { PersonEditorControlModule } from '@ui/controls/person-editor-control/person-editor-control.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { FullNamePipeModule } from '@shared/pipes/fullname/full-name-pipe.module';
import { PeopleResolver } from '@features/admin/people/_services/people.resolvers';
import { AgePluralizeModule } from '@shared/pipes/age/age-pluralize.module';
import { PeopleAdvancedSearchComponent } from './list/advanced-search/people-advanced-search.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { PersonAutocompleteControlModule } from '@ui/controls/person-autocomplete-control/person-autocomplete-control.module';
import { PersonFormModule } from '@features/admin/people/new-family-form/person-form/person-form.module';

@NgModule({
    declarations: [
        ContactsComponent,
        ContactsListComponent,
        ContactsDetailsComponent,

        // People
        NewFamilyFormComponent,
        //PersonFormDialogComponent,
        FamilyMembersListComponent,
        PeopleAdvancedSearchComponent
    ],
    imports     : [
        RouterModule.forChild(contactsRoutes),

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

        PersonFormModule,

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
    providers   : [
        {
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: moment.ISO_8601
                },
                display: {
                    dateInput         : 'LL',
                    monthYearLabel    : 'MMM YYYY',
                    dateA11yLabel     : 'LL',
                    monthYearA11yLabel: 'MMMM YYYY'
                }
            }
        },
        PeopleDataService, PeopleResolver
    ]
})
export class ContactsModule
{
}
