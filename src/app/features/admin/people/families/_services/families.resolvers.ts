import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FamiliesService } from '@features/admin/people/families/_services/families.service';

/**
 * Single Family by id Resolvers
 */
@Injectable()
export class FamilyResolver 
{
    /**
     * Constructor
     */
    constructor(private _service: FamiliesService)
    {
    }

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._service.getById$(+route.paramMap.get('id'));
    }
}