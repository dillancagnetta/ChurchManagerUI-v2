import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {FamiliesDataService, Family} from '@features/admin/people/families';

@Injectable()
export class FamiliesService
{
    private _families: BehaviorSubject<any[]> = new BehaviorSubject([]);
    private _family: BehaviorSubject<Family> = new BehaviorSubject(null);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for families
     */
    get families$(): Observable<any[]>
    {
        return this._families.asObservable();
    }

    /**
     * Getter for family
     */
    get family$(): Observable<Family>
    {
        return this._family.asObservable();
    }

    constructor(private _data: FamiliesDataService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get family by id
     */
    getById$(familyId: number, includePeople = false): Observable<Family> {
        return this._data.getFamilyById$(familyId, includePeople)
            .pipe(
                tap(family => this._family.next(family))
            );
    }
}

