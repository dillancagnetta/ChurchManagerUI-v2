import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '@shared/shared.module';
import { AnalyticsComponent } from './analytics.component';
import { analyticsRoutes } from './analytics.routing';
import { DashboardDataService } from './dashboard-data.service';
import {DashboardStore} from "@features/admin/dashboard/dashboard.store";
import {ChurchesSelectControlModule} from "@ui/controls/churches-select-control/churches-select-control.module";

@NgModule({
    declarations: [
        AnalyticsComponent
    ],
    imports: [
        RouterModule.forChild(analyticsRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        NgApexchartsModule,
        SharedModule,
        ChurchesSelectControlModule
    ],
    providers: [DashboardDataService, DashboardStore]
})
export class AnalyticsModule
{
}
