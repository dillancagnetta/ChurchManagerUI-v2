import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { BirthDateEditorComponent } from './birthdate-editor.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';

@NgModule( {
    declarations: [BirthDateEditorComponent],
    exports: [BirthDateEditorComponent],
    imports: [
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,

        SharedModule
    ]
} )
export class BirthDateEditorModule {
}
