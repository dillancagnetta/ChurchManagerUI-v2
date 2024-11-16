import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FamilyDetailComponent } from '@features/admin/people/families/_components/detail/family-detail.component';

@Injectable({
    providedIn: 'root'
})
export class CanDeactivateFamilyDetail
{
    canDeactivate(
        component: FamilyDetailComponent, // Drawer Component
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // Get the next route
      let nextRoute: ActivatedRouteSnapshot = nextState.root;
      while ( nextRoute.firstChild )
      {
        nextRoute = nextRoute.firstChild;
      }

      // If the next state doesn't contain '/families'
      // it means we are navigating away from the
      // families
      if ( !nextState.url.includes('/families') )
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
