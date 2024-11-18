import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Profile} from '../profile.model';
import {ProfileService} from './profile.service';
import {ProfileDiscipleshipService} from '../tabs/discipleship/profile-discipleship.service';
import {DiscipleshipProgramsForPerson} from '@features/admin/discipleship/discipleship.models';

@Injectable()
export class ProfileResolver
{
    /**
     * Constructor
     */
    constructor(private _profileService: ProfileService)
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profile>
    {
        // Try extract personId from route
        const { personId } = route.params;

        // Fork join multiple API endpoint calls to wait all of them to finish

        return  this._profileService.getUserProfileWithHistory$(personId);
         /* return forkJoin([
            this._profileService.getUserProfile$(personId),
            this._profileService.browseHistory$('Person', personId, 0, 3) // Get limited data for history summary only
          ]).pipe(
              map(([profile, history]) => {
                  // Set history on profile
                  profile.history = history.data;
                  return profile
                } // close map
              )
          );*/
    }
}

@Injectable()
export class ProfileDiscipleshipResolver
{
    /**
     * Constructor
     */
    constructor(private _service: ProfileDiscipleshipService)
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DiscipleshipProgramsForPerson>
    {
        // Try extract personId from route
        const { personId } = route.parent.params;

        return this._service.getDiscipleshipStepsForPerson$(personId);
    }
}