// TODO: move to own file
import { BehaviorSubject, combineLatest, defer, Observable, Subject } from 'rxjs';
import { finalize, map, share, startWith, switchMap } from 'rxjs/operators';
import { PagedResult, PaginatedEndpoint, Sort } from './pagination.models';
import { SimpleDataSource } from './simple.data-source';

// Define the type for combined query and page state
type QueryState<TQuery> = {
  query: TQuery;
  page: number;
};

export class PaginatedDataSource<TModel, TQuery> implements SimpleDataSource<TModel>, IPaginatedDataSource
{
    // Track query and page state together to avoid multiple calls on changes
    private _queryState: BehaviorSubject<QueryState<TQuery>>;

    private readonly _sort: BehaviorSubject<Sort<TModel>>;

    private _loading = new Subject<boolean>();

    public loading$ = this._loading.asObservable();
    page$: Observable<PagedResult<TModel>>;

    constructor(
        public endpoint: PaginatedEndpoint<TModel, TQuery>,
        initialSort: Sort<TModel>,
        initialQuery: TQuery,
        public pageSize = 10) {

        this._sort = new BehaviorSubject<Sort<TModel>>(initialSort);
        this._queryState = new BehaviorSubject<QueryState<TQuery>>({
          query: initialQuery,
          page: 0,
        });

        const param$ = combineLatest([this._queryState, this._sort]);

        this.page$ = param$
          .pipe(
            switchMap(([{ query, page }, sort]) =>
              this.endpoint({ page, sort, size: this.pageSize }, query).pipe(
                indicate(this._loading)
              )
            ),
            share()
          );
    }

    sortBy( sort: Partial<Sort<TModel>> ): void {
        const lastSort = this._sort.getValue();
        const nextSort = { ...lastSort, ...sort };
        this._sort.next( nextSort );
    }

    queryBy( query: Partial<TQuery> ): void {
        const lastState = this._queryState.getValue();
        const nextQuery = { ...lastState.query, ...query };
        // Emit the new query and reset page in a single update
        this._emitQueryState(nextQuery,  0);
    }

    fetch( page: number ): void {
        // this._pageNumber.next( page + 1 ); // MatPaginator starts at page 0
        // Emit the new query and reset page in a single update
        const lastState = this._queryState.getValue();
        this._emitQueryState(lastState.query,  page);  //  MatPaginator starts at page 0
    }

    /**
    * Emit the new query and reset page in a single update
    */
    private _emitQueryState(query: TQuery , page: number): void {
      this._queryState.next({ query, page });
    }

    /**
     * Basically returns the current list of paginated/filtered/sorted items
     * @returns Observable that emits a new value when the data changes.
     * */
    connect(): Observable<TModel[]> {
        //  provide a stream of lists of items by mapping from the page
        return this.page$.pipe( map( page => page.data ) );
    }

    disconnect(): void {  }
}

// https://nils-mehlhorn.de/posts/indicating-loading-the-right-way-in-angular
export function prepare<T>(callback: () => void): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => defer(() => {
        callback();
        return source;
    });
}

export function indicate<T>(indicator: Subject<boolean>): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => source.pipe(
        prepare(() => indicator.next(true)),
        finalize(() => indicator.next(false))
    );
}

export interface IPaginatedDataSource
{
    page$: Observable<PagedResult<any>>;

    loading$: Observable<boolean>;
    //endpoint: PaginatedEndpoint<any, any>;
    //pageSize: number;

    //sortBy( sort: Partial<Sort<any>> ): void;

    queryBy(query: Partial<any>): void;

    fetch(page: number): void;
}
