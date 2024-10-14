import { NgModule } from '@angular/core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { SharedModule } from '@shared/shared.module';
import { GroupTypesSelectControl } from './group-types-select-control';
import { GroupTypesSelectDataService } from '@ui/controls/group-types-select-control/group-types-select-data.service';

const COMPONENTS = [
    GroupTypesSelectControl
];

@NgModule({
    declarations: [COMPONENTS],
    imports: [
        MatFormFieldModule,
        MatSelectModule,

        SharedModule
    ],
    exports: [COMPONENTS],
    providers: [GroupTypesSelectDataService]
})
export class GroupTypesSelectControlModule
{
}
