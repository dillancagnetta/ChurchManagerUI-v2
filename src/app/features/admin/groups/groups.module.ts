import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { groupsRoutes } from '@features/admin/groups/groups.routing';
import { GroupsComponent } from '@features/admin/groups/groups.component';
import { GroupsManageResolver } from '@features/admin/groups/_services/groups.resolvers';
import { GroupsManageService } from '@features/admin/groups/_services/groups-manage.service';
import { GroupsViewerComponent } from '@features/admin/groups/manage/components/list/groups-viewer.component';
import { GroupsManageComponent } from '@features/admin/groups/manage/groups-manage.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [GroupsComponent, GroupsManageComponent, GroupsViewerComponent],
    imports: [
        RouterModule.forChild(groupsRoutes),

        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatTooltipModule,
        MatTreeModule,

        SharedModule
    ],
    providers: [GroupsManageResolver, GroupsManageService]
})
export class GroupsModule
{
}