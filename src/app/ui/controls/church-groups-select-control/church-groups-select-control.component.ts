import { Component, ElementRef, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ChurchGroupsSelectControlDataService } from './church-groups-select-control-data.service';
import { SelectItem } from '@shared/shared.models';

/*
 *  https://www.truecodex.com/course/angular-6/cascading-or-dependent-dropdown-list-country-state-city-in-angular-6-7
 */
@Component( {
    selector: 'cm-church-groups-control',
    templateUrl: './church-groups-select-control.component.html',
    styleUrls: ['./church-groups-select-control.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef( () => ChurchGroupsSelectControlComponent ),
            multi: true
        }
    ]
} )
export class ChurchGroupsSelectControlComponent implements ControlValueAccessor, OnInit, OnDestroy {

    private readonly _destroyed$: Subject<void> = new Subject();

    public form = new FormGroup( {
        churchId: new FormControl( null, [Validators.required] ),
        groupId: new FormControl( null),
    } );

    churches$: Observable<SelectItem[]> = this._data.getChurches$();
    groups$: Observable<SelectItem[]>;

    constructor( private _elementRef: ElementRef, private _data: ChurchGroupsSelectControlDataService ) { }

    ngOnInit() {
        // Responds to changes in the church select and loads the groups
        this.groups$ = this.form.get('churchId')
            .valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap( (churchId: number) => this._data.getGroups$(churchId))
            );
    }

    writeValue( churchAndGroup: any ): void {
        if ( churchAndGroup ) {
            this.form.patchValue( churchAndGroup );
        }
    }

    registerOnChange(fn: any): void {
        this.form.valueChanges
            .pipe(
                takeUntil( this._destroyed$ )
            )
            .subscribe( fn );
    }

    registerOnTouched(fn: any): void {
        this._elementRef.nativeElement.querySelectorAll( '*' ).forEach(
            ( element: HTMLElement ) => {
                fromEvent( element, 'blur' )
                    .pipe(
                        takeUntil( this._destroyed$ ),
                        tap( x => fn() )
                    ).subscribe();
            }
        );
    }

    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.form.disable() : this.form.enable();
    }

    ngOnDestroy() {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
}
