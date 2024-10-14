import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { SharedModule } from '@shared/shared.module';
import { ChurchGroupsSelectControlComponent } from './church-groups-select-control.component';
import { ChurchGroupsSelectControlDataService } from './church-groups-select-control-data.service';

@NgModule( {
    declarations: [ChurchGroupsSelectControlComponent],
    exports: [ChurchGroupsSelectControlComponent],
    imports: [
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,

        SharedModule
    ],
    providers: [ChurchGroupsSelectControlDataService]
} )
export class ChurchGroupsSelectControlModule
{
}