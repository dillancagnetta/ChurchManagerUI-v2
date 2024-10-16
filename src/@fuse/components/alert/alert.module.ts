import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseAlertComponent } from '@fuse/components/alert/alert.component';
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
    declarations: [
        FuseAlertComponent
    ],
    imports     : [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule
    ],
    exports     : [
        FuseAlertComponent
    ]
})
export class FuseAlertModule
{
}
