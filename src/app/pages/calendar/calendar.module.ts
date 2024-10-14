import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { FuseDateRangeModule } from '@fuse/components/date-range';
import { CalendarRecurrenceComponent } from './recurrence/recurrence.component';
import { SharedModule } from '@shared/shared.module';
import { CalendarRecurrenceRuleFriendlyPipe } from './calendar.pipes';

@NgModule({
    declarations: [
        CalendarRecurrenceComponent,
        CalendarRecurrenceRuleFriendlyPipe
    ],
    imports     : [
        ScrollingModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatMomentDateModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatTooltipModule,
        FuseDateRangeModule,
        SharedModule
    ],
    exports: [CalendarRecurrenceComponent, FuseDateRangeModule, CalendarRecurrenceRuleFriendlyPipe],
    providers   : [
        {
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: 'DD/MM/YYYY'
                },
                display: {
                    dateInput         : 'DD/MM/YYYY',
                    monthYearLabel    : 'MMM YYYY',
                    dateA11yLabel     : 'DD/MM/YYYY',
                    monthYearA11yLabel: 'MMMM YYYY'
                }
            }
        }
    ]
})
export class CalendarModule
{
}
