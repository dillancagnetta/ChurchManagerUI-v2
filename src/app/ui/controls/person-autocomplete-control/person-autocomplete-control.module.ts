import { NgModule } from '@angular/core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { SharedModule } from '@shared/shared.module';
import { PersonAutocompleteControl } from './person-autocomplete-control';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { PersonSearchService } from '@ui/controls/person-autocomplete-control/person-search.service';

const COMPONENTS = [
    PersonAutocompleteControl
];

@NgModule({
    declarations: [COMPONENTS],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        SharedModule
    ],
    exports: [COMPONENTS],
    providers: [PersonSearchService]
})
export class PersonAutocompleteControlModule
{
}
