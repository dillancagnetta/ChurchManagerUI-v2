import { NgModule } from '@angular/core';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { SharedModule } from '@shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { GeneralTableComponent } from '@ui/components/general-table/general-table.component';
import { PaginatedGeneralTableComponent } from '@ui/components/general-table/paginated-general-table/paginated-general-table.component';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';

/**
 * @credit JamesDepret
 *
 * https://github.com/JamesDepret/angular-generic-mat-table/blob/master/src/app/app.component.html
 * https://stackblitz.com/edit/angular-generic-mat-table
 */

@NgModule( {
    declarations: [GeneralTableComponent, PaginatedGeneralTableComponent],
    exports: [GeneralTableComponent, PaginatedGeneralTableComponent],
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatIconModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        MatMenuModule,

        SharedModule
    ]
} )
export class GeneralTableModule
{
}
