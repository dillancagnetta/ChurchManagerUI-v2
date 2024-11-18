import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  model,
  OnInit,
  Output,
  signal,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FilterItem, PeopleAdvancedSearchQuery, SearchItem} from '@features/admin/people';
import {SelectionModel} from '@angular/cdk/collections';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';

@Component({
    selector: 'people-advanced-search',
    templateUrl: './people-advanced-search.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleAdvancedSearchComponent implements OnInit {

    @Output() searchChanged = new EventEmitter<PeopleAdvancedSearchQuery>();

    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    selection = new SelectionModel<SearchItem>(true, []);

    @ViewChild('chipInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    readonly connectionStatusMap = ['Member',  'First Timer',  'New Convert'];
    readonly ageClassificationMap = ['Adult', 'Teen', 'Child'];
    readonly genderMap = ['Male', 'Female', 'Unknown'];
    readonly recordStatusMap = ['Active', 'Pending', 'Inactive'];
    churchId = model<number>(0);

    /* Chip Filters */

    // Chip map with tool tip description
    chipFilterItems: FilterItem[] =  [
      {key: 'baptised', label: 'Baptised', description:  'Is Baptised', color: 'primary'},
      {key: 'notBaptised', label: 'Not Baptised', description:  'Not Baptised', color: 'accent'},
      {key: 'holySpirit', label: 'Holy Spirit', description:  'Received Holy Spirit', color: 'primary'},
      {key: 'noHolySpirit', label: 'No Holy Spirit', description:  'Not Received Holy Spirit', color: 'accent'},
      {key: 'noPhoto', label: 'No Photo', description:  'No Photo', color: 'warn'},
    ]

    chipFilterLabels: string[] = this.chipFilterItems.map( x => x.label);

    readonly chipFilterCtrl = model('');
    $chipsSelected = signal([]);

    // Filtered chips: dynamically updates based on input and already selected filters
    readonly filteredFruits = computed(() =>
      this.chipFilterLabels
        // Autocomplete filter
        .filter((label) => label.toLowerCase().includes(this.chipFilterCtrl().toLowerCase()))
        // Filter out what was already selected
        .filter((label) => !this.$chipsSelected().includes(label))
    );


    ngOnInit(): void
    {
    }

    updateSearch()
    {
        const model: PeopleAdvancedSearchQuery = {
            connectionStatus: this._selectedItemsByGroup('connectionStatus'),
            ageClassification: this._selectedItemsByGroup('ageClassification'),
            gender: this._selectedItemsByGroup('gender'),
            recordStatus: this._selectedItemsByGroup('recordStatus'),
            filters: this.$chipsSelected()
                .map(x => this.chipFilterItems.find( f => f.label === x))
                .map(x => x.key),
            churchId: this.churchId()
        };

        this.searchChanged.emit(model)
    }

    selectSearchItem( group: string, key: string,  checked: boolean )
    {
        // SelectionModel works by checking object references
        // This code makes sure we only add an item to selected if its not already there
        // If we are changing from selected to deselected we find the selection and update
        if ( checked ) {
           if ( !this.selection.selected.find( x => x.key === key) ) {
               this.selection.select( { group, key });
           }
        }
         else {
             const selection = this.selection.selected.find( x => x.key === key)
            this.selection.deselect(selection);
        }
    }

    add(event: MatChipInputEvent): void
    {
      // Do nothing: Users cannot add custom chips manually.
    }

    remove(removed: string): void
    {
      this.$chipsSelected.update(filter => {
        const index = filter.indexOf(removed);
        if (index < 0) {
          return filter;
        }

        filter.splice(index, 1);
        return [...filter];
      });
    }

    selected(event: MatAutocompleteSelectedEvent): void
    {
        //this.selectedChipFilters.push(event.option.viewValue);
      this.$chipsSelected.update(chips => [...chips, event.option.viewValue]);
      event.option.deselect();
      // Clear the input value
      this.chipFilterCtrl.set('');
    }

    private _selectedItemsByGroup(group: string): string[]
    {
        return  this.selection.selected
            .filter(x => x.group === group)
            .map(x => x.key)
    }
}
