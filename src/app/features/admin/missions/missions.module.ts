import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { missionsRoutes } from '@features/admin/missions/missions.routing';
import { MissionResolver } from '@features/admin/missions/_services/missions.resolvers';
import { MissionsComponent } from '@features/admin/missions/missions.component';
import { MissionsService } from '@features/admin/missions/_services/missions.service';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { FuseAutogrowModule } from '@fuse/directives/autogrow';
import { MissionDetailComponent } from '@features/admin/missions/_components/detail/mission-detail.component';
import { MissionsListComponent } from '@features/admin/missions/_components/list/missions-list.component';
import { MissionsListQueryComponent } from '@features/admin/missions/_components/list-query/missions-list-query.component';
import { GeneralTableModule } from '@ui/components/general-table/general-table.module';
import { MissionsCreateDialogComponent } from '@features/admin/missions/_components/create/missions-create-dialog.component';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { ChurchGroupsSelectControlModule } from '@ui/controls/church-groups-select-control/church-groups-select-control.module';
import { PersonAutocompleteControlModule } from '@ui/controls/person-autocomplete-control/person-autocomplete-control.module';
import { ChurchesSelectControlModule } from '@ui/controls/churches-select-control/churches-select-control.module';
import { MissionsDataService } from '@features/admin/missions/_services/missions-data.service';

@NgModule({
    declarations: [
        MissionsComponent,
        MissionsListComponent,
        MissionsListQueryComponent,
        MissionDetailComponent,
        MissionsCreateDialogComponent
    ],
    imports:[
        RouterModule.forChild(missionsRoutes),
        SharedModule,

        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
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

        // Fuse
        FuseAutogrowModule,
        FuseScrollbarModule,

        // UI Controls
        GeneralTableModule,
        ChurchGroupsSelectControlModule,
        PersonAutocompleteControlModule,
        ChurchesSelectControlModule
    ],
    providers: [
        MissionResolver,
        MissionsService,
        MissionsDataService
    ]
})
export class MissionsModule
{
}