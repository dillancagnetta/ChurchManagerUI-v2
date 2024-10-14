import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FuseDateRangeComponent } from '@fuse/components/date-range/date-range.component';

@NgModule({
    declarations: [
        FuseDateRangeComponent
    ],
    imports     : [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatMomentDateModule
    ],
    exports     : [
        FuseDateRangeComponent
    ]
})
export class FuseDateRangeModule
{
}
