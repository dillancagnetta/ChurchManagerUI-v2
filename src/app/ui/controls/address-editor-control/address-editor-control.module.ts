import { NgModule } from '@angular/core';
import { AddressEditorComponent } from './address-editor.component';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { SharedModule } from '@shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

@NgModule( {
    declarations: [AddressEditorComponent],
    exports: [AddressEditorComponent],
    imports: [
        MatInputModule,
        MatIconModule,
        MatSelectModule,

        SharedModule
    ]
} )
export class AddressEditorControlModule {
}
