import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {  MatSelectChange } from '@angular/material/select';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileDiscipleshipService } from './profile-discipleship.service';
import { DiscipleshipProgramsForPerson } from '@features/admin/discipleship/discipleship.models';

@Component({
    selector     : 'profile-discipleship',
    templateUrl  : './profile-discipleship.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileDiscipleshipComponent
{
    filters: {
        categorySlug$: BehaviorSubject<string>;
        query$: BehaviorSubject<string>;
        hideCompleted$: BehaviorSubject<boolean>;
    } = {
        categorySlug$ : new BehaviorSubject('all'),
        query$        : new BehaviorSubject(''),
        hideCompleted$: new BehaviorSubject(false)
    };

    programs$: Observable<DiscipleshipProgramsForPerson>;

    /**
     * Constructor
     */
    constructor(
        private _service: ProfileDiscipleshipService
    )
    {
        this.programs$ = _service.programs$;
    }

    /**
     * Filter by category
     *
     * @param change
     */
    filterByCategory(change: MatSelectChange): void
    {
        this.filters.categorySlug$.next(change.value);
    }
}