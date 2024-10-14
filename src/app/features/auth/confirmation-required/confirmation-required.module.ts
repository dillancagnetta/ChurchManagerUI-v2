import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from '@shared/shared.module';
import { AuthConfirmationRequiredComponent } from 'app/features/auth/confirmation-required/confirmation-required.component';
import { authConfirmationRequiredRoutes } from 'app/features/auth/confirmation-required/confirmation-required.routing';

@NgModule({
    declarations: [
        AuthConfirmationRequiredComponent
    ],
    imports     : [
        RouterModule.forChild(authConfirmationRequiredRoutes),
        MatButtonModule,
        FuseCardModule,
        SharedModule
    ]
})
export class AuthConfirmationRequiredModule
{
}
