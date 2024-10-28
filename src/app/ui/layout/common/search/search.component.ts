import {
  Component,
  computed,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  signal,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {of, Subject} from 'rxjs';
import {catchError, debounceTime, filter, finalize, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {fuseAnimations} from '@fuse/animations/public-api';
import {PersonAutocompletes} from '@ui/layout/common/search/search-bar.models';
import {Observable} from 'rxjs/internal/Observable';
import {ApiResponse} from '@shared/shared.models';
import {ENV} from '@shared/constants';
import {Environment} from '@shared/environment.model';
import {MatSelectChange} from "@angular/material/select";
import {Router} from "@angular/router";

@Component({
    selector     : 'search',
    templateUrl  : './search.component.html',
    styleUrl     : './search.component.scss',
    encapsulation: ViewEncapsulation.None,
    exportAs     : 'fuseSearch',
    animations   : fuseAnimations
})
export class SearchComponent implements OnChanges, OnInit, OnDestroy
{
    @Input() appearance: 'basic' | 'bar' = 'basic';
    @Input() debounce: number = 300;
    @Input() minLength: number = 2;
    @Output() search: EventEmitter<any> = new EventEmitter<any>();

    opened: boolean = false;
    isSearching: boolean = false;
    results: PersonAutocompletes;
    searchControl: UntypedFormControl = new UntypedFormControl();
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    // Search Type
    $searchType = signal<'people' | 'groups'>('people');
    $searchTypeText = computed(() => {
      const searchType = this.$searchType();

      return `Search for a ${searchType=='people' ? 'person' : 'group' }`
    });

    /**
     * Constructor
     */
    constructor(
        private readonly _httpClient: HttpClient,
        private readonly _router: Router,
        @Inject(ENV) private environment: Environment,
    )
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
            'search-appearance-bar'  : this.appearance === 'bar',
            'search-appearance-basic': this.appearance === 'basic',
            'search-opened'          : this.opened
        };
    }

    /**
     * Setter for bar search input
     *
     * @param value
     */
    @ViewChild('barSearchInput')
    set barSearchInput(value: ElementRef)
    {
        // If the value exists, it means that the search input
        // is now in the DOM and we can focus on the input..
        if ( value )
        {
            // Give Angular time to complete the change detection cycle
            setTimeout(() => {

                // Focus to the input element
                value.nativeElement.focus();
            });
        }
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
        // Appearance
        if ( 'appearance' in changes )
        {
            // To prevent any issues, close the
            // search after changing the appearance
            this.close();
        }
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to the search field value changes
        this.searchControl.valueChanges
            .pipe(
                debounceTime(this.debounce),
                takeUntil(this._unsubscribeAll),
                map((value) => {

                    // Set the search results to null if there is no value or
                    // the length of the value is smaller than the minLength
                    // so the autocomplete panel can be closed
                    if ( !value || value.length < this.minLength )
                    {
                        this.results = null;
                    }

                    // Continue
                    return value;
                }),
                filter((value) => {
                    // Filter out undefined/null/false statements and also
                    // filter out the values that are smaller than minLength
                    return value && value.length >= this.minLength;
                }),
                tap(() => this.isSearching = true),
                // use switch map so as to cancel previous subscribed events, before creating new once
                switchMap(value =>  this.lookup(value)
                    .pipe(
                        finalize(() => this.isSearching = false)
                    )
                )
            )
            .subscribe((response: PersonAutocompletes) => {
                // Store the results
                this.results = response;
                // Execute the event
                this.search.next(this.results);
            });
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On keydown of the search input
     *
     * @param event
     */
    onKeydown(event: KeyboardEvent): void
    {
        // Listen for escape to close the search
        // if the appearance is 'bar'
        if ( this.appearance === 'bar' )
        {
            // Escape
            if ( event.code === 'Escape' )
            {
                // Close the search
                this.close();
            }
        }
    }

    /**
     * Open the search
     * Used in 'bar'
     */
    open(): void
    {
        // Return if it's already opened
        if ( this.opened )
        {
            return;
        }

        // Open the search
        this.opened = true;
    }

    /**
     * Close the search
     * * Used in 'bar'
     */
    close(): void
    {
        // Return if it's already closed
        if ( !this.opened )
        {
            return;
        }

        // Clear the search input
        this.searchControl.setValue('');

        // Close the search
        this.opened = false;
    }

    lookup(value: string): Observable<PersonAutocompletes> {
        return this.searchApi(value.toLowerCase()).pipe(
            // map the date property of the api results
            map(response => response.data.map(person => person)),
            // catch errors
            catchError(_ => {
                return of(null);
            })
        );
    }

    searchApi(query: string): Observable<ApiResponse> {
        const url = `${this.environment.baseUrls.apiUrl}/v1/${this.$searchType()}/autocomplete?searchTerm=${query}`;
        return this._httpClient.get<ApiResponse>(url);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
      return item.id || index;
    }

    onSearchTypeChange({value}: MatSelectChange) {
      if (this.$searchType() !== value) {
        this.$searchType.set(value);
        this.searchControl.setValue('');
      }
    }

  navigateToSearch(id:  number) {
    const url = this.$searchType() === 'people' ? `/pages/profile/${id}` : `/apps/groups/${id}`;
    this._router.navigateByUrl(url)
  }
}
