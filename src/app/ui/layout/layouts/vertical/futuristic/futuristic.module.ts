import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { MessagesModule } from '@ui/layout/common/messages/messages.module';
import { NotificationsModule } from '@ui/layout/common/notifications/notifications.module';
import { SearchModule } from '@ui/layout/common/search/search.module';
import { ShortcutsModule } from '@ui/layout/common/shortcuts/shortcuts.module';
import { UserMenuModule } from '@ui/layout/common/user-menu/user-menu.module';
import { SharedModule } from '@shared/shared.module';
import { FuturisticLayoutComponent } from '@ui/layout/layouts/vertical/futuristic/futuristic.component';

@NgModule({
    declarations: [
        FuturisticLayoutComponent
    ],
    imports     : [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        FuseNavigationModule,
        MessagesModule,
        NotificationsModule,
        SearchModule,
        ShortcutsModule,
        UserMenuModule,
        SharedModule
    ],
    exports     : [
        FuturisticLayoutComponent
    ]
})
export class FuturisticLayoutModule
{
}
