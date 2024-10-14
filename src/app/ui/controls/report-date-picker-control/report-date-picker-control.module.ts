import { NgModule } from '@angular/core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { SharedModule } from '@shared/shared.module';
import { ReportDatePickerControlComponent } from './report-date-picker-control';
import { MatIconModule } from '@angular/material/icon';

const COMPONENTS = [
    ReportDatePickerControlComponent
];

@NgModule({
    declarations: [COMPONENTS],
    imports: [
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,

        SharedModule
    ],
    exports: [COMPONENTS],
})
export class ReportDatePickerControlModule
{
}
