import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Overlay} from '@angular/cdk/overlay';
import {MAT_AUTOCOMPLETE_SCROLL_STRATEGY, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {SharedModule} from '@shared/shared.module';
import {SearchComponent} from '@ui/layout/common/search/search.component';
import {MatSelect} from "@angular/material/select";

@NgModule({
    declarations: [
        SearchComponent
    ],
    imports: [
        RouterModule.forChild([]),
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        SharedModule,
        MatSelect
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
