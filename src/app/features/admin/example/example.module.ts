import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/features/admin/example/example.component';
import { ReportDatePickerControlModule } from '@ui/controls/report-date-picker-control/report-date-picker-control.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { GeneralTableModule } from '@ui/components/general-table/general-table.module';
import { pagingServiceProvider } from './mock/providers/example-paging.providers';
import { PersonAutocompleteControlModule } from '@ui/controls/person-autocomplete-control/person-autocomplete-control.module';
import { ExamplePaginatedQueryComponent } from '@features/admin/example/components/example-paginated-query/example-paginated-query';
import { ChurchGroupsSelectControlModule } from '@ui/controls/church-groups-select-control/church-groups-select-control.module';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '@shared/shared.module';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ExampleComponent
    }
];


@NgModule({
    declarations: [
        ExampleComponent,
        ExamplePaginatedQueryComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatDatepickerModule,

        // Controls
        ReportDatePickerControlModule,
        GeneralTableModule,
        PersonAutocompleteControlModule,
        ChurchGroupsSelectControlModule,

        SharedModule
    ],
    providers : [
        pagingServiceProvider
    ]
})
export class ExampleModule
{
}


