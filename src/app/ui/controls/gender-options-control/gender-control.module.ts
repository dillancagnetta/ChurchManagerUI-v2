import { NgModule } from '@angular/core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { SharedModule } from '@shared/shared.module';
import { GenderOptionsControl } from './gender-options.control';

const COMPONENTS = [
    GenderOptionsControl
];

@NgModule({
    declarations: [COMPONENTS],
    imports: [
        MatFormFieldModule,
        MatSelectModule,

        SharedModule
    ],
    exports: [COMPONENTS]
})
export class GenderControlModule
{
}
