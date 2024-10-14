import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseCardModule } from '@fuse/components/card';
import { ProfileComponent } from './profile.component';
import { profileRoutes } from './_services/profile.routing';
import { SharedModule } from '@shared/shared.module';
import { ProfileDiscipleshipResolver, ProfileResolver } from './_services/profile.resolvers';
import { ProfileService } from './_services/profile.service';
import { ProfileAboutComponent } from './tabs/about/profile-about.component';
import { ProfileGroupsComponent } from './tabs/groups/groups.component';
import { GroupAttendanceFormDialogComponent } from './tabs/groups/components/group-attendance-form/group-attendance-form-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { GenderControlModule } from '@ui/controls/gender-options-control/gender-control.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { GroupsDataService } from '@features/admin/groups';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { FuseAutogrowModule } from '@fuse/directives/autogrow';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import {
    ProfileConnectionInfoFormDialogComponent,
    ProfileDiscipleshipInfoFormDialogComponent,
    ProfileGeneralInfoFormDialogComponent,
    ProfilePersonalInfoFormDialogComponent,
    ProfilePhotoFormDialogComponent
} from './tabs/about/components';
import { BirthDateEditorModule } from '@ui/controls/birthdate-editor-control/birthdate-editor.module';
import { ChurchesSelectControlModule } from '@ui/controls/churches-select-control/churches-select-control.module';
import { AgePluralizeModule } from '@shared/pipes/age/age-pluralize.module';
import { ProfileDiscipleshipService } from './tabs/discipleship/profile-discipleship.service';
import { ProfileDiscipleshipComponent } from './tabs/discipleship/profile-discipleship.component';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { ProfileMyDashboardComponent } from './components/my-dashboard/my-dashboard.component';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { UploadImagesModule } from '@ui/components/upload-images/upload-images.module';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { FuseAlertModule } from '@fuse/components/alert';
import { ProfileFollowUpComponent } from './tabs/followup/follow-up.component';
import { GeneralTableModule } from '@ui/components/general-table/general-table.module';


@NgModule({
    declarations: [
        ProfileComponent,
        // Tabs
        ProfileAboutComponent,
        ProfileGroupsComponent,
        ProfileDiscipleshipComponent,
        // Dialogs
        GroupAttendanceFormDialogComponent,
        // Edit Dialogs
        ProfileGeneralInfoFormDialogComponent,
        ProfileConnectionInfoFormDialogComponent,
        ProfilePersonalInfoFormDialogComponent,
        ProfileDiscipleshipInfoFormDialogComponent,
        ProfilePhotoFormDialogComponent,
        ProfileMyDashboardComponent
    ],
    imports     : [
        RouterModule.forChild(profileRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTableModule,
        MatTooltipModule,
        MatToolbarModule,

        // Fuse
        FuseCardModule,
        FuseAutogrowModule,
        FuseAlertModule,
        FuseScrollbarModule,
        FuseFindByKeyPipeModule,
        SharedModule,

        // UI Controls
        GenderControlModule,
        BirthDateEditorModule,
        ChurchesSelectControlModule,
        GeneralTableModule,

        // Extensions
        AgePluralizeModule,
        UploadImagesModule
    ],
    providers: [
        ProfileResolver, ProfileDiscipleshipResolver,
        ProfileService, GroupsDataService, ProfileDiscipleshipService]
})
export class ProfileModule
{
}
