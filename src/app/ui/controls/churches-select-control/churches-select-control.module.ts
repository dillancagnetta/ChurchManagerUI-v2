import { NgModule } from '@angular/core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { SharedModule } from '@shared/shared.module';
import { ChurchesSelectControlComponent } from './churches-select-control';
import { ChurchGroupsSelectControlDataService } from '../church-groups-select-control/church-groups-select-control-data.service';

const COMPONENTS = [
    ChurchesSelectControlComponent
];

@NgModule({
    declarations: [COMPONENTS],
    imports: [
        MatFormFieldModule,
        MatSelectModule,

        SharedModule
    ],
    exports: [COMPONENTS],
    providers: [ChurchGroupsSelectControlDataService]
})
export class ChurchesSelectControlModule
{
}
