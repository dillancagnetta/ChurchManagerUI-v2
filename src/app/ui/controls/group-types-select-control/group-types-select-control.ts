import { Component, EventEmitter, forwardRef, Input, OnDestroy, Output, input } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Observable, Subject } from 'rxjs';
import { SelectItem } from '@shared/shared.models';
import { takeUntil } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
import { GroupTypesSelectDataService } from '@ui/controls/group-types-select-control/group-types-select-data.service';

@Component({
    selector: 'group-types-select-control',
    templateUrl: './group-types-select-control.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => GroupTypesSelectControl),
            multi: true
        }
    ]
})
export class GroupTypesSelectControl implements ControlValueAccessor, OnDestroy
{
    /**
     * required
     *
     * @param {boolean} value
     */
    private _required = false;
    @Input()
    get required(): boolean
    {
        return this._required;
    }
    set required(value: boolean)
    {
        this._required = coerceBooleanProperty(value);
    }

    @Output() selectionChange = new EventEmitter<MatSelectChange>();

    /**
     * select list form control
     */
    selectListControl = new UntypedFormControl('');

    /**
     * select items observable
     */
    items$: Observable<SelectItem[]> = this._data.getGroupTypes$();

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     */
    constructor(private _data: GroupTypesSelectDataService)
    {
        this._unsubscribeAll = new Subject();
    }

    /**
     * model --> view
     */
    writeValue(value: number): void {
        if (value) {
            this.selectListControl.setValue(value, { emitEvent: false });
        } else {
            this.selectListControl.reset('');
        }
    }

    /**
     * view --> model
     */
    registerOnChange(fn: (value: number) => void) {
        this.selectListControl
            .valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(fn);
    }

    /**
     * model --> view
     */
    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    onTouched: () => void = () => {};

    /**
     * On Selection Change - mark as touched
     */
    onSelectionChange(selection: MatSelectChange) {
        this.selectionChange.emit(selection);
        this.onTouched();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next({});
        this._unsubscribeAll.complete();
    }

}
