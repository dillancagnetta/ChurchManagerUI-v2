import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupsManageService } from '@features/admin/groups/_services/groups-manage.service';

/**
 * Returns all groups and their children
 */
@Injectable()
export class GroupsManageResolver 
{

    constructor(private _service: GroupsManageService)
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._service.getGroupsTree$();
    }
}

/**
 * Returns single group by Id and its children
 */
@Injectable()
export class GroupManageResolver 
{

    constructor(private _service: GroupsManageService)
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        // Try extract groupId from route
        const { groupId } = route.params;

        return this._service.getGroupTree$(groupId);
    }
}