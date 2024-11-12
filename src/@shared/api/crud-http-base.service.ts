import {Observable} from "rxjs";
import {Inject, inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ENV} from "@shared/constants";
import {Environment} from "@shared/environment.model";
import {Entity, Filter} from "@core/store/crud-state.feature";
import {ApiResponse} from "@shared/shared.models";


export interface CrudDataService<E extends Entity, F extends Filter> {
  browse(filter: F): Observable<ApiResponse>;

  getAll(): Observable<ApiResponse>;

  get(id: number): Observable<ApiResponse>

  create(entity: E): Observable<ApiResponse>;

  update(entity: E): Observable<ApiResponse>;

  delete(id: number): Observable<ApiResponse>;
}

@Injectable()
export abstract class CrudService<TEntity extends Entity,F extends Filter> implements CrudDataService<TEntity, F> {

  protected readonly http = inject(HttpClient);
  protected readonly baseApiUrl = this._environment.baseUrls.apiUrl + '/v1';

  protected abstract entityUrl: string;

  constructor(@Inject(ENV) private readonly _environment: Environment)
  {
  }

  /*Example
  *
  *  http://localhost:5001/api/v1/GroupTypes/browse
  * */

  browse(filter: F): Observable<ApiResponse> {
    const url =`${this.baseApiUrl}/${this.entityUrl}/browse`;
    return this.http.post<ApiResponse>(url, { filter });
  }

  getAll(): Observable<ApiResponse> {
    const url =`${this.baseApiUrl}/${this.entityUrl}`;
    return this.http.get<ApiResponse>(url);
  }

  get(id: number): Observable<ApiResponse> {
    const url =`${this.baseApiUrl}/${this.entityUrl}`;
    return this.http.get<ApiResponse>(`${url}/${id}`);
  }

  create(value: TEntity): Observable<ApiResponse>{
    const url =`${this.baseApiUrl}/${this.entityUrl}`;
    console.log('create crud', value);
    return this.http.post<ApiResponse>(url, value );
  }

  update(value: TEntity): Observable<ApiResponse>{
    const url =`${this.baseApiUrl}/${this.entityUrl}`;
    return this.http.put<ApiResponse>(`${url}/${value.id}`, value);
  }

  delete(id: number): Observable<ApiResponse>{
    const url =`${this.baseApiUrl}/${this.entityUrl}`;
    return this.http.delete<ApiResponse>(`${url}/${id}`);
  }
}