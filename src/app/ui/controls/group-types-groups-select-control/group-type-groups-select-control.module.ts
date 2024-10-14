import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { SharedModule } from '@shared/shared.module';
import { GroupTypeGroupsSelectControlComponent } from '@ui/controls/group-types-groups-select-control/group-type-groups-select-control.component';
import { GroupTypeGroupsSelectControlDataService } from '@ui/controls/group-types-groups-select-control/group-type-groups-select-control-data.service';

@NgModule( {
    declarations: [GroupTypeGroupsSelectControlComponent],
    exports: [GroupTypeGroupsSelectControlComponent],
    imports: [
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,

        SharedModule
    ],
    providers: [GroupTypeGroupsSelectControlDataService]
} )
export class GroupTypeGroupsSelectControlModule
{
}