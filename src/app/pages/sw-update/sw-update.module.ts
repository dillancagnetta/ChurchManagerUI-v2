import { NgModule } from '@angular/core';
import { SwUpdateComponent } from './sw-update.component';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [SwUpdateComponent],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        SharedModule
    ],
    exports: [SwUpdateComponent]
})
export class SwUpdateModule
{
}