import {patchState, signalStore, watchState, withHooks, withMethods, withState} from "@ngrx/signals";
import {UserService} from "@core/user/user.service";
import {inject} from "@angular/core";
import {setError, setLoaded, setLoading, withCallState} from "@core/store/call-state.feature";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {pipe, switchMap, tap} from "rxjs";
import {tapResponse} from "@ngrx/operators";
import {OnlineStatus, User} from "@core/user/user.model";
import {data} from "autoprefixer";

export interface CurrentUserState {
  data: User;
}

export const userInitialState: CurrentUserState = {
  data: {
    userLoginId: null,
    personId: null,
    name: null,
    email: null,
    avatar: 'assets/images/avatars/profile-blank.jpg',
    status: 'offline'
  }
}

export const CurrentUserStore = signalStore(
  { providedIn: 'root' },
  withState<CurrentUserState>(userInitialState),
  withMethods((store, service = inject(UserService)) => ({

    /* Get user initial data */
    getUserData: rxMethod<void>(
        pipe(
          tap(() => setLoading('getUser')),
          switchMap(() => service.getUserData$().pipe(
            tapResponse({
              next: (user) => patchState(store, { data: user, ...setLoaded('getUser') }),
              error: ({ error }) => patchState(store, { data: userInitialState.data, ...setError(error, 'getUser') }),
            }),
          )))
        ),

      /* Update user online status */
      updateToOfflineStatus: rxMethod<void>(
        pipe(tap(() => {
          const status: OnlineStatus = 'offline';
          const updated = {...store.data(), status};
          patchState(store, { data: updated})
        }))
      ),
      /* Update user online status */
      updateToOnlineStatus: rxMethod<void>(
        pipe(tap(() => {
          const status: OnlineStatus = 'online';
          const updated = {...store.data(), status};
          patchState(store, { data: updated})
        }))
      )
    })
  ), // withMethods

  withHooks({
    onInit(store) {
      watchState(store, (state) => {
        console.log('[watchState] user state', state);
      });
    },
  }),

  withCallState({ collection: 'getUser' }),
)