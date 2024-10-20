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
        component: FamilyDetailComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return undefined;
    }
}
