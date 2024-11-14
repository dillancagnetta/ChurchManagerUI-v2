import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Output, input } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Identifiable } from '@shared/shared.models';
import { MatSelectChange } from '@angular/material/select';

@Component( {
    selector: 'cm-gender-field',
    templateUrl: './gender-options.control.html',
    styleUrls: ['./gender-options.control.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => GenderOptionsControl),
            multi: true
        }
    ]
} )
export class GenderOptionsControl implements ControlValueAccessor {

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    items = input<Identifiable[]>([
        { id: 'Male', label: 'Male' },
        { id: 'Female', label: 'Female' },
        { id: 'Unknown', label: 'Unknown' }
    ]);

    appearance = input('outline'); // | 'outline';
    showLabel = input(true);
    label = input('Gender'); // overwritten from base
    @Output() selectionChange = new EventEmitter<MatSelectChange>();

    /**
     * Inner form control to link input text changes to mat select
     */
    inputControl = new UntypedFormControl( '',  [Validators.required] );

    onSelectionChange( selection: MatSelectChange ) {
        this.selectionChange.emit(selection);
        this.onTouched();
    }

    // model --> view
    writeValue(value: string): void {
        if (value) {
            this.inputControl.setValue(value, { emitEvent: false });
        } else {
            this.inputControl.reset('');
        }
    }

    // view --> model
    registerOnChange(fn: (value: string) => void) {
        this.inputControl
            .valueChanges
            .subscribe(fn);
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    onTouched: () => void = () => {};
}