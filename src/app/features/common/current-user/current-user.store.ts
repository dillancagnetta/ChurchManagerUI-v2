import {patchState, signalStore, watchState, withHooks, withMethods, withState} from "@ngrx/signals";
import {UserService} from "@core/user/user.service";
import {inject} from "@angular/core";
import {setError, setLoaded, setLoading, withCallState} from "@core/store/call-state.feature";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {pipe, switchMap, tap} from "rxjs";
import {tapResponse} from "@ngrx/operators";
import {User} from "@core/user/user.model";

export interface CurrentUserState {
  data: User;
}

export const userInitialState: CurrentUserState = {
  data: {
    id: null,
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
      getUserData: rxMethod<void>(
        pipe(
          tap(() => setLoading('getUser')),
          switchMap(() => service.getUserData$().pipe(
            tapResponse({
              next: (user) => patchState(store, { data: user, ...setLoaded('getUser') }),
              error: ({ error }) => patchState(store, { data: userInitialState.data, ...setError(error, 'getUser') }),
            }),
          )))
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