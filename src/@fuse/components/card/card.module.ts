import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseCardComponent } from '@fuse/components/card/card.component';
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
    declarations: [
        FuseCardComponent
    ],
    imports     : [
        CommonModule,
        MatFormFieldModule
    ],
    exports     : [
        FuseCardComponent
    ]
})
export class FuseCardModule
{
}
