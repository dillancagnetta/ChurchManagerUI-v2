import {Component, effect, inject, OnInit, Signal, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {fuseAnimations} from '@fuse/animations';
import {FuseAlertType} from '@fuse/components/alert';
import {AuthStore} from "@core/auth/auth.store";

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    private readonly authStore = inject(AuthStore);

    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType, message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    $tenants: Signal<string[]> = this.authStore.tenants;
    $error: Signal<string> = this.authStore.authError;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    )
    {
        // Listen for errors and if show the error message
        effect(() => {
            if (this.$error()) {
                // Enable the form
                this.signInForm.enable();
                // Set the alert
                this.alert = {
                    type   : 'error',
                    message: 'Something is wrong, please try again.'
                };
                // Show the alert
                this.showAlert = true;
            }
        });

        // Redirect when login successful
        effect(() => {
          if (this.authStore.isAuthenticated()) {
            console.log('logged in');
            // Set the redirect url.
            // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
            // to the correct page after a successful sign in. This way, that url can be set via
            // routing file and we don't have to touch here.
            const redirectURL = _activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
            // Navigate to the redirect url
            _router.navigateByUrl(redirectURL);
          }
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
        // Create the form
        this.signInForm = this._formBuilder.group({
            username     : ['', [Validators.required]],
            password  : ['', Validators.required],
            tenant  : ['', Validators.required],
            rememberMe: ['']
        });

        this.authStore.getTenants();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void
    {
        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this.authStore.signIn(this.signInForm.value);

        // Sign in
        /*this._authService.signIn(this.signInForm.value)
            .subscribe(
                {
                    next: () => {
                        console.log('logged in');
                        // Set the redirect url.
                        // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                        // to the correct page after a successful sign in. This way, that url can be set via
                        // routing file and we don't have to touch here.
                        const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                        // Navigate to the redirect url
                        this._router.navigateByUrl(redirectURL);
                    },
                    error: (e) => {

                        // Re-enable the form
                        this.signInForm.enable();

                        // Reset the form
                        this.signInNgForm.resetForm();

                        // Set the alert
                        this.alert = {
                            type   : 'error',
                            message: 'Wrong email or password'
                        };

                        // Show the alert
                        this.showAlert = true;
                    }
                }
            );*/
    }
}
