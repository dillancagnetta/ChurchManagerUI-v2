import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CellMinistryComponent } from './cell-ministry-home/cell-ministry.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { CellAttendanceReportsComponent } from './cell-attendance-reports/cell-attendance-reports.component';
import { CellMinistryDataService } from './_services/cell-ministry-data.service';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { ChurchGroupsSelectControlModule } from '@ui/controls/church-groups-select-control/church-groups-select-control.module';
import { SharedModule } from '@shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AttendanceReportFeedbackComponent } from '@features/admin/groups/cell-ministry/attendance-report-feedback/attendance-report-feedback';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { CanDeactivateAttendanceReportFeedback } from '@features/admin/groups/cell-ministry/_services/cell-ministry.guards';
import {
    CellGroupPerformanceResolver,
    CellMinistryAttendanceReportResolver,
    CellMinistryDashboardResolver
} from '@features/admin/groups/cell-ministry/_services/cell-ministry.resolvers';
import { MatSortModule } from '@angular/material/sort';
import { FuseAutogrowModule } from '@fuse/directives/autogrow';
import { UserRolesModule } from '@shared/directives/user-roles';
import { UserRolesPipeModule } from '@shared/pipes/user-roles/user-roles-pipe.module';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { CellAttendanceReportSubmissionsComponent } from '@features/admin/groups/cell-ministry/cell-attendance-report-submissions/cell-attendance-report-submissions.component';
import { ChurchesSelectControlModule } from '@ui/controls/churches-select-control/churches-select-control.module';
import { GeneralTableModule } from '@ui/components/general-table/general-table.module';
import { CellGroupPerformanceComponent } from '@features/admin/groups/cell-ministry/cell-group-performance/cell-group-performance.component';
import { CellGroupPerformanceDataService } from '@features/admin/groups/cell-ministry/_services/cell-group-performance-data.service';

const routes: Routes = [
    {
        path     : '',
        component: CellMinistryComponent,
        resolve: {
            dashboardData: CellMinistryDashboardResolver
        }
    },
    {
        path     : 'attendance-reports',
        component: CellAttendanceReportsComponent,
        children : [
            {
                path         : ':id',
                component    : AttendanceReportFeedbackComponent,
                canDeactivate: [CanDeactivateAttendanceReportFeedback],
                resolve: {
                    attendanceRecord: CellMinistryAttendanceReportResolver
                }
            }
        ]
    },
    {
        path     : 'group-attendance-reports/:groupId',
        component: CellAttendanceReportsComponent,
        children : [
            {
                path         : ':id',
                component    : AttendanceReportFeedbackComponent,
                canDeactivate: [CanDeactivateAttendanceReportFeedback],
                resolve: {
                    attendanceRecord: CellMinistryAttendanceReportResolver
                }
            }
        ]
    },
    {
        path     : 'attendance-report-submissions',
        component: CellAttendanceReportSubmissionsComponent
    },
    {
        path     : 'group-performance/:groupId',
        component: CellGroupPerformanceComponent,
        resolve: {
            performanceRecord: CellGroupPerformanceResolver
        }
    },
];

@NgModule({
    declarations: [
        CellMinistryComponent,
        CellAttendanceReportsComponent,
        CellAttendanceReportSubmissionsComponent,
        AttendanceReportFeedbackComponent,

        CellGroupPerformanceComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedModule,

        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSidenavModule,
        MatSortModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatTableModule,
        MatTooltipModule,
        NgApexchartsModule,

        // Fuse
        FuseAutogrowModule,

        // Controls
        ChurchGroupsSelectControlModule,
        ChurchesSelectControlModule,
        GeneralTableModule,

        // Pipes & Directives
        UserRolesModule,
        UserRolesPipeModule
    ],
    providers: [
        CellMinistryDataService,
        CellGroupPerformanceDataService,
        CellMinistryAttendanceReportResolver,
        CellMinistryDashboardResolver,
        CellGroupPerformanceResolver
    ]
})
export class CellMinistryModule
{
}