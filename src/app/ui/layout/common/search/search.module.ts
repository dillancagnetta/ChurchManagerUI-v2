import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
import { MAT_LEGACY_AUTOCOMPLETE_SCROLL_STRATEGY as MAT_AUTOCOMPLETE_SCROLL_STRATEGY, MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { SharedModule } from '@shared/shared.module';
import { SearchComponent } from '@ui/layout/common/search/search.component';

@NgModule({
    declarations: [
        SearchComponent
    ],
    imports     : [
        RouterModule.forChild([]),
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        SharedModule
    ],
    exports     : [
        SearchComponent
    ],
    providers   : [
        {
            provide   : MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
            useFactory: (overlay: Overlay) => {
                return () => overlay.scrollStrategies.block();
            },
            deps      : [Overlay]
        }
    ]
})
export class SearchModule
{
}
