import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ScrumboardService } from './scrumboard.service';
import { DiscipleshipProgramSummary, DiscipleshipStep } from '@features/admin/discipleship/discipleship.models';
import { PagedRequest, PagedResult } from '@shared/data/pagination.models';
import { StepParticipantsQuery } from '@features/admin/scrumboard/step-participants/step-participants.component';

@Injectable({
    providedIn: 'root'
})
export class ScrumboardBoardsResolver 
{
    /**
     * Constructor
     */
    constructor(
        private _scrumboardService: ScrumboardService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DiscipleshipProgramSummary[]>
    {
        return this._scrumboardService.getBoards();
    }
}

@Injectable({
    providedIn: 'root'
})
export class ScrumboardBoardResolver 
{
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _scrumboardService: ScrumboardService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DiscipleshipProgramSummary>
    {
        return this._scrumboardService.getBoard(+route.paramMap.get('boardId'))
                   .pipe(
                       // Error here means the requested task is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}

@Injectable({
    providedIn: 'root'
})
export class ScrumboardCardResolver 
{
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _scrumboardService: ScrumboardService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagedResult<DiscipleshipStep>>
    {
        const pagedRequest: PagedRequest<DiscipleshipStep> = { page: 0, size: 10, sort: null };
        const query: StepParticipantsQuery = {};

        return this._scrumboardService.pageDiscipleshipStepParticipants(
            +route.paramMap.get('definitionId'),
            pagedRequest,
            query)
                   .pipe(
                       // Error here means the requested task is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}
