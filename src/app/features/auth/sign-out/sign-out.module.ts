import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from '@shared/shared.module';
import { AuthSignOutComponent } from 'app/features/auth/sign-out/sign-out.component';
import { authSignOutRoutes } from 'app/features/auth/sign-out/sign-out.routing';

@NgModule({
    declarations: [
        AuthSignOutComponent
    ],
    imports     : [
        RouterModule.forChild(authSignOutRoutes),
        MatButtonModule,
        FuseCardModule,
        SharedModule
    ]
})
export class AuthSignOutModule
{
}
