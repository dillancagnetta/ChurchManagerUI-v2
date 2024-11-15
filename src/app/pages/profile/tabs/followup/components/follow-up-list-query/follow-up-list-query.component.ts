import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import { QueryBase } from '@shared/query-base';
import { FollowUpQuery } from '../../follow-up.models';
import { UntypedFormBuilder } from '@angular/forms';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { cloneDeep } from 'lodash-es';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'profile-follow-up-list-query',
  templateUrl: './follow-up-list-query.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowUpListQueryComponent extends QueryBase<FollowUpQuery> implements OnInit, OnDestroy
{
    private readonly _destroyRef = inject(DestroyRef);

    followUpTypes: string[] = ['New Convert', 'General Well Being', 'Home Visitation', 'Death'];
    severityList: string[] = ['Normal' , 'Urgent'];

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _route: ActivatedRoute
    )
  {
      super();

      this.searchForm = this._formBuilder.group({
          types: [],
          severity: [],
          assignedToMe: [false],
          withAction: [false],
          person: [null],
          assignedPerson: [null],
          from: [null],
          to: [null]
      });
  }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
  ngOnInit(): void
  {
      // Extract PersonId from parent URL
      // https://ultimatecourses.com/blog/angular-parent-routing-params
      const personId$: Observable<any> = this._route.parent.params
        .pipe(takeUntilDestroyed(this._destroyRef))
        .pipe(map((params)  => params));

      this.query$  =  this.searchBtnClicked
          .pipe(takeUntilDestroyed(this._destroyRef))
          .pipe(withLatestFrom(personId$))
          .pipe(
              filter( () =>  this.searchForm.valid),
              map( ([_, personId]) => {
                  const query: FollowUpQuery = cloneDeep(this.searchForm.value);

                  if (personId) {
                      query.person = {id: +personId};
                      console.log('FollowUpListQuery', query);
                  }

                  return query;
              })
          );
  }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next({});
        this.unsubscribeAll.complete();
    }
}
