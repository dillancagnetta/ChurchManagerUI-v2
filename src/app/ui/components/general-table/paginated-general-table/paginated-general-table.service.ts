import { Injectable } from '@angular/core';
import { IPaginatedDataSource, PaginatedDataSource } from '@shared/data/paginated.data-source';
import { PagedResult, PaginatedEndpoint, Sort } from '@shared/data/pagination.models';
import { Observable } from 'rxjs';
import {SimpleDataSource} from "@shared/data/simple.data-source";

export interface IPaginatedTableService extends IPaginatedDataSource
{
    readonly dataSource: IPaginatedDataSource & SimpleDataSource<any>;
}

@Injectable()
export class PaginatedGeneralTableService<TModel, TQuery> implements IPaginatedTableService {

    public readonly dataSource: PaginatedDataSource<TModel, TQuery> | null;

    page$: Observable<PagedResult<TModel>>;
    loading$: Observable<boolean>;

    constructor(
        private endpoint: PaginatedEndpoint<TModel, TQuery>,
        initialSort: Sort<TModel>,
        initialQuery: TQuery)
    {
        this.dataSource = new PaginatedDataSource<TModel, TQuery>(
            endpoint, initialSort, initialQuery
        );

        // Configure public streams
        this.page$ = this.dataSource.page$;
        this.loading$ = this.dataSource.loading$;
    }

    queryBy(query: Partial<TQuery>): void
    {
        this.dataSource.queryBy(query);
    }

    fetch(page: number): void
    {
        this.dataSource.fetch(page);
    }
}
