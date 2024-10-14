import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MissionsService } from '@features/admin/missions/_services/missions.service';
import { GroupAttendanceRecord } from '@features/admin/groups/cell-ministry/cell-ministry.model';

/**
 * Single Mission by id Resolvers
 */
@Injectable()
export class MissionResolver 
{
    /**
     * Constructor
     */
    constructor(private _service: MissionsService)
    {
    }

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GroupAttendanceRecord>
    {
        return this._service.getMissionById$(+route.paramMap.get('id'));
    }
}