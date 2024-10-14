import { NgModule } from '@angular/core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { SharedModule } from '@shared/shared.module';
import { RecordStatusSelectControlComponent } from './record-status-select-control';
import { MatIconModule } from '@angular/material/icon';

const COMPONENTS = [
    RecordStatusSelectControlComponent
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
export class RecordStatusSelectControlModule
{
}
