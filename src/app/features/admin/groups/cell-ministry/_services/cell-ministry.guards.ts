import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AttendanceReportFeedbackComponent } from '../attendance-report-feedback/attendance-report-feedback';

@Injectable({
    providedIn: 'root'
})
export class CanDeactivateAttendanceReportFeedback 
{
    canDeactivate(
        component: AttendanceReportFeedbackComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        // Get the next route
        let nextRoute: ActivatedRouteSnapshot = nextState.root;
        while ( nextRoute.firstChild )
        {
            nextRoute = nextRoute.firstChild;
        }

        // If the next state doesn't contain '/cell-ministry'
        // it means we are navigating away from the
        // cell-ministry
        if ( !nextState.url.includes('/cell-ministry') )
        {
            // Let it navigate
            return true;
        }

        // If we are navigating to another record...
        if ( nextRoute.paramMap.get('id') )
        {
            // Just navigate
            return true;
        }
        // Otherwise...
        else
        {
            // Close the drawer first, and then navigate
            return component.closeDrawer().then(() => {
                return true;
            });
        }
    }
}
