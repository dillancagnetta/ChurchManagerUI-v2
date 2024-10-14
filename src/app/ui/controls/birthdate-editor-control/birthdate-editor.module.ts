import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { BirthDateEditorComponent } from './birthdate-editor.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/card';

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
