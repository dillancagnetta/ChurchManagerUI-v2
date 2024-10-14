import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UploadImagesComponent } from '@ui/components/upload-images/upload-images.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';

@NgModule( {
    declarations: [UploadImagesComponent],
    exports: [UploadImagesComponent],
    imports: [
        MatCardModule,
        MatToolbarModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatListModule,

        SharedModule
    ]
} )
export class UploadImagesModule
{
}