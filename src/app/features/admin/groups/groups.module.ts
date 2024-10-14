import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { groupsRoutes } from '@features/admin/groups/groups.routing';
import { GroupsComponent } from '@features/admin/groups/groups.component';
import { GroupManageResolver, GroupsManageResolver } from '@features/admin/groups/_services/groups.resolvers';
import { GroupsManageService } from '@features/admin/groups/_services/groups-manage.service';
import { MatTreeModule } from '@angular/material/tree';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '@shared/shared.module';
import {
    GroupDetailsComponent,
    GroupMembersComponent,
    GroupsManageComponent,
    GroupsViewerComponent
} from '@features/admin/groups/manage';
import { GroupsDataService } from '@features/admin/groups/_services/groups-data.service';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { AddGroupMemberFormDialogComponent } from '@features/admin/groups/manage/components/members/add/add-group-member-form-dialog.component';
import { PersonAutocompleteControlModule } from '@ui/controls/person-autocomplete-control/person-autocomplete-control.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { GroupDetailDialogComponent } from '@features/admin/groups/manage/components/group-detail/group-detail-dialog.component';
import { GroupTypesSelectControlModule } from '@ui/controls/group-types-select-control/group-types-select-control.module';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatDividerModule } from '@angular/material/divider';
import { CalendarModule } from '../../../pages/calendar';
import { NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { ChurchesSelectControlModule } from '@ui/controls/churches-select-control/churches-select-control.module';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { RecordStatusSelectControlModule } from '@ui/controls/record-status-select-control/record-status-select-control.module';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { ChurchGroupsSelectControlModule } from '@ui/controls/church-groups-select-control/church-groups-select-control.module';

@NgModule({
    declarations: [
        GroupsComponent,
        GroupsManageComponent,
        GroupsViewerComponent,
        GroupDetailsComponent,
        GroupMembersComponent,
        // Dialogs
        AddGroupMemberFormDialogComponent,
        GroupDetailDialogComponent
    ],
    imports: [
        RouterModule.forChild(groupsRoutes),

        MatButtonModule,
        MatButtonToggleModule,
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
        MatSidenavModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,

        SharedModule,
        CalendarModule,

        // Controls
        PersonAutocompleteControlModule,
        GroupTypesSelectControlModule,
        ChurchesSelectControlModule,
        ChurchGroupsSelectControlModule,
        RecordStatusSelectControlModule,

        // 3rd Party
        NgxMatNativeDateModule,
        NgxMatTimepickerModule
    ],
    providers: [
        GroupsManageResolver,
        GroupManageResolver,
        GroupsManageService,
        GroupsDataService
    ]
})
export class GroupsModule
{
}