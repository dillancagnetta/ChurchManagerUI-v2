import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import { GeneralTableModule } from '@ui/components/general-table/general-table.module';
import { familiesRoutes } from '@features/admin/people/families/families.routing';
import { FamiliesListComponent } from '@features/admin/people/families/_components/list/families-list.component';
import { FamiliesListQueryComponent } from '@features/admin/people/families/_components/list-query/families-list-query.component';
import { FamilyDetailComponent } from '@features/admin/people/families/_components/detail/family-detail.component';
import { FamilyResolver } from '@features/admin/people/families/_services/families.resolvers';
import { FamiliesService } from '@features/admin/people/families/_services/families.service';
import { FamiliesDataService } from '@features/admin/people/families/_services/families-data.service';
import { PersonFormModule } from '@features/admin/people/new-family-form/person-form/person-form.module';

@NgModule({
    declarations: [
        FamiliesListComponent,
        FamiliesListQueryComponent,
        FamilyDetailComponent
    ],
    imports:[
        RouterModule.forChild(familiesRoutes),
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

        PersonFormModule,

        // Fuse
        FuseAutogrowModule,

        // UI Controls
        GeneralTableModule
    ],
    providers: [
        FamilyResolver,
        FamiliesService,
        FamiliesDataService
    ]
})
export class FamiliesModule
{
}