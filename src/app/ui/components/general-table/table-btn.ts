import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export interface TableBtn {
  styleClass?: string;
  icon: string;
  payload: (element: any) => string;
  action: string;
  text?: string;
  disabled?: boolean;
  disabledFn?: (element: any) => boolean;
}

export interface TableToolbar extends Omit<TableBtn, 'payload'> {
  color?: string;
  tooltip?: string;
}


/**
 *  @summary Pagination Service Token
 *
 *  to use, inject:    @Inject( PAGING_DATA ) private service
 */
export const PAGING_SERVICE = new InjectionToken('Paginated Datasource service');


export interface TableQuery {
    query$: Observable<any>;
}

