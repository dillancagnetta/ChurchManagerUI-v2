import {patchState, signalStore, watchState, withHooks, withMethods, withState} from '@ngrx/signals';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {authInitialState, AuthState, Credentials} from './auth.model';
import {inject} from '@angular/core';
import {exhaustMap, pipe, switchMap, tap} from 'rxjs';
import {tapResponse} from '@ngrx/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from "@core/local-storage/local-storage.service";
import {AuthService} from "@core/auth/auth.service";
import {FormErrorsStore} from "@shared/forms/forms-errors.store";
import {setError, setLoaded, withCallState} from "@core/store/call-state.feature";
import {HttpErrorResponse} from "@angular/common/http";

export const AuthStore = signalStore(
  {providedIn: 'root'},
  withState<AuthState>(authInitialState),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      localStorage = inject(LocalStorageService),
      formErrorsStore = inject(FormErrorsStore),
      router = inject(Router),
      activatedRoute = inject(ActivatedRoute),
    ) => ({

      getTenants: rxMethod<void>(
        pipe(
          switchMap(() => authService.tenants$()),
          tap((response: { name: string }[]) => {
            const tenants = response.map(x => x.name);
            patchState(store, {tenants, ...setLoaded('auth')})
          }),
        ),
      ),
      signIn: rxMethod<Credentials>(
        pipe(
          exhaustMap((credentials) =>
            authService.signIn(credentials).pipe(
              tapResponse({
                next: ({accessToken, refreshToken}) => {
                  patchState(store, {isAuthenticated: true, accessToken});
                  localStorage.setItem('accessToken', accessToken);
                  localStorage.setItem('refreshToken', refreshToken);

                  //const redirectURL = activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                  //console.log('signIn', accessToken)
                  // Navigate to the redirect url
                  // router.navigateByUrl(redirectURL);
                },
                //error: (error: Error) => formErrorsStore.setErrors({'SignIn Error': error.message}),
                error: (error: HttpErrorResponse) => {
                  console.error('sign in error', error.message);
                  patchState(store, {isAuthenticated: false, ...setError(error.message, 'auth')});
                },
              }),
            ),
          ),
        ),
      ),


      signOut: () => {
        patchState(store, {isAuthenticated: false, accessToken: null});
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // router.navigate(['sign-in'])
      },
    }),
  ),

  withHooks({
    onInit(store) {
      // store.getTenants();

      watchState(store, (state) => {
        console.log('[watchState] auth state', state);
      });
    },
  }),

  withCallState({collection: 'auth'}),
);
