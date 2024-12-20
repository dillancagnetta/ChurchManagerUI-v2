import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {ENV} from '@shared/constants';
import {Environment} from '@shared/environment.model';
import {
  Profile,
  ProfileConnectionInfo,
  ProfileDiscipleshipInfo,
  ProfileGeneralInfo,
  ProfileModel,
  ProfilePersonalInfo,
  History
} from '../profile.model';
import {PagedRequest, PagedResult} from '@shared/data/pagination.models';
import {GroupsQuery} from '../tabs/groups/groups.component';
import {Group} from '@features/admin/groups';
import {ApiResponse} from '@shared/shared.models';

@Injectable()
export class ProfileService
{
    private _profile: BehaviorSubject<Profile | null> = new BehaviorSubject(null);

    private _apiUrl = this.environment.baseUrls.apiUrl;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param environment
     */
    constructor(
        private _httpClient: HttpClient,
        @Inject(ENV) private environment: Environment
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for profile
     */
    get profile$(): Observable<Profile>
    {
        return this._profile.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get Person Profile
     * @summary: will return profile by person id if present in URL or the current logged in user
     */
    getUserProfile$(personId: number | undefined): Observable<Profile>
    {
        const profileUrl = personId === undefined
            ? `${this._apiUrl}/v1/profiles/current-user`  // Current User
            : `${this._apiUrl}/v1/profiles/person/${personId}`;  // Person Id

        return this._httpClient.get<any>(profileUrl)
            .pipe(
                tap(
                    response => {
                        const profile = new ProfileModel(response.data);
                        console.log( 'Profile', profile, 'getUserProfile$' );
                        this._profile.next(profile);
                    }),
              map(() => this._profile.getValue())
            );
    }

    getUserProfileWithHistory$(personId: number | undefined): Observable<any> {
      // Fork join multiple API endpoint calls to wait all of them to finish
      return forkJoin([
        this.getUserProfile$(personId),
        this.browseHistory$('Person', personId, 0, 3) // Get limited data for history summary only
      ]).pipe(
        tap(([profile, history]) => {
            // Set history on profile
            profile.history = history.data;
            const _profile = new ProfileModel(profile);
            console.log( 'Profile', profile, 'getUserProfileWithHistory$' );
            this._profile.next(_profile);
          }
        )
      );
    }

    /**
     * Paging groups
     */
    pageGroups( request: PagedRequest<Group>, query: GroupsQuery ): Observable<PagedResult<Group>> {
        console.log('page called', request, query);
        return this._browseGroupsApi(request.page, request.size, query.search, query.personId)
            .pipe(
                map((pagedResult: PagedResult<Group>) => {
                    return pagedResult;
                })
            );
    }

    /**
     * Edit person connection information
     *
     */
    editConnectionInfo$(personId: number, model: ProfileConnectionInfo): Observable<ApiResponse>
    {
        return this._httpClient.post<ApiResponse>(`${this._apiUrl}/v1/people/edit/${personId}/connection-info`, model);
    }

    /**
     * Edit person personal information
     *
     */
    editPersonalInfo$(personId: number, model: ProfilePersonalInfo): Observable<ApiResponse>
    {
        return this._httpClient.post<ApiResponse>(`${this._apiUrl}/v1/people/edit/${personId}/personal-info`, model);
    }

    /**
     * Edit person general information
     *
     */
    editGeneralInfo$(personId: number, model: ProfileGeneralInfo): Observable<ApiResponse>
    {
        return this._httpClient.post<ApiResponse>(`${this._apiUrl}/v1/people/edit/${personId}/general-info`, model);
    }

    /**
     * Edit person discipleship information
     *
     */
    editDiscipleshipInfo$(personId: number, model: ProfileDiscipleshipInfo): Observable<ApiResponse>
    {
        return this._httpClient.post<ApiResponse>(`${this._apiUrl}/v1/people/edit/${personId}/discipleship-info`, model);
    }

    deletePhoto$(personId: number): Observable<any>
    {
        return this._httpClient.delete<any>(`${this._apiUrl}/v1/people/edit/${personId}/photo`);
    }


    browseHistory$(entity: string, entityId: number  | undefined, page: number, size: number): Observable<PagedResult<History>> {
      const profileUrl = entityId === undefined
        ? `${this._apiUrl}/v1/history/current-user?entityType=${entity}&page=${page}&results=${size}`  // Current User
        : `${this._apiUrl}/v1/history?entityType=${entity}&entityId=${entityId}&page=${page}&results=${size}`;  // Person Id

      return this._httpClient.get<PagedResult<History>>(profileUrl);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * This is where you call your server,
     * you can pass your start page and end page
     */
    private _browseGroupsApi( page: number, size: number, search: string, personId?: number ): Observable<any> {
        const groupsUrl = personId === undefined
            ? `${this._apiUrl}/v1/groups/browse/current-user`  // Current User
            : `${this._apiUrl}/v1/groups/browse/person/${personId}`;  // Person Id

        return this._httpClient.post<any>( groupsUrl, {
            searchTerm: search,
            page,
            results: size
        } );
    }

}
