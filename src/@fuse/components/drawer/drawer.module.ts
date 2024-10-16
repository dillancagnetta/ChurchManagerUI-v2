import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseDrawerComponent } from '@fuse/components/drawer/drawer.component';
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
    declarations: [
        FuseDrawerComponent
    ],
    imports     : [
        CommonModule,
        MatFormFieldModule
    ],
    exports     : [
        FuseDrawerComponent
    ]
})
export class FuseDrawerModule
{
}
