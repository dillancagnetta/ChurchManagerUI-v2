import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, ViewEncapsulation} from '@angular/core';
import {MatDrawerToggleResult} from "@angular/material/sidenav";
import {FamiliesListComponent} from "@features/admin/people/families/_components/list/families-list.component";
import {ActivatedRoute, Router} from "@angular/router";
import {FamiliesService} from "@features/admin/people/families/_services/families.service";
import {tap} from "rxjs/operators";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Family} from "@features/admin/people/families";

@Component({
    selector       : 'family',
    templateUrl    : './family-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamilyDetailComponent implements OnInit
{
  $familyRecord = signal<Family>(null);

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);

  /**
   * Constructor
   */
  constructor(
    // Parent Component
    public readonly component: FamiliesListComponent,
    private readonly _service: FamiliesService
  )
  {

  }

  ngOnInit(): void
  {
    // Open the drawer
    this.component.matDrawer.open();

    // Set the record
    this._service.family$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .pipe(
        tap((family) => {
          console.log('family detail', family);
          this.$familyRecord.set(family)
        })
      ).subscribe();
  }

  /**
   * Close the drawer
   */
  closeDrawer(): Promise<MatDrawerToggleResult>
  {
    return this.component.matDrawer.close();
  }

  goToProfile(personId: number) {
    this._router.navigateByUrl(`/pages/profile/${personId}`)
  }
}