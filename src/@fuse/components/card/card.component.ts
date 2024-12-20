import {Component, HostBinding, OnChanges, SimpleChanges, ViewEncapsulation, input, signal, model} from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { fuseAnimations } from '@fuse/animations';
import { FuseCardFace } from '@fuse/components/card/card.types';

@Component({
    selector     : 'fuse-card',
    templateUrl  : './card.component.html',
    styleUrls    : ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    exportAs     : 'fuseCard'
})
export class FuseCardComponent implements OnChanges
{
    static ngAcceptInputType_expanded: BooleanInput;
    static ngAcceptInputType_flippable: BooleanInput;

    expanded = model<boolean>(false);
    face = model<FuseCardFace>('front');
    flippable = model<boolean>(false);

    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Host binding for component classes
     */
    @HostBinding('class') get classList(): any
    {
        return {
            'fuse-card-expanded'  : this.expanded(),
            'fuse-card-face-back' : this.flippable() && this.face() === 'back',
            'fuse-card-face-front': this.flippable() && this.face() === 'front',
            'fuse-card-flippable' : this.flippable()
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void
    {
        // Expanded
        if ( 'expanded' in changes )
        {
            // Coerce the value to a boolean
            this.expanded.set(coerceBooleanProperty(changes.expanded.currentValue));
        }

        // Flippable
        if ( 'flippable' in changes )
        {
            // Coerce the value to a boolean
            this.flippable.set(coerceBooleanProperty(changes.flippable.currentValue));
        }
    }
}
