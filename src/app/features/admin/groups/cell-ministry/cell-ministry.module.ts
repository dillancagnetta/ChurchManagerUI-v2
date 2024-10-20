import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CellMinistryComponent } from './cell-ministry-home/cell-ministry.component';
import {MatButtonModule} from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {  MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { CellAttendanceReportsComponent } from './cell-attendance-reports/cell-attendance-reports.component';
import { CellMinistryDataService } from './_services/cell-ministry-data.service';
import {MatInputModule} from '@angular/material/input';
import {  MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChurchGroupsSelectControlModule } from '@ui/controls/church-groups-select-control/church-groups-select-control.module';
import { SharedModule } from '@shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AttendanceReportFeedbackComponent } from '@features/admin/groups/cell-ministry/attendance-report-feedback/attendance-report-feedback';
import {MatTooltipModule} from '@angular/material/tooltip';
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
import {MatProgressBarModule} from '@angular/material/progress-bar';
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