import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    ExtraOptions,
    PreloadAllModules,
    provideRouter,
    RouterModule,
    withInMemoryScrolling,
    withPreloading
} from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from '@core/core.module';
import { appConfig } from '@core/config/fuseConfig';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/ui/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {provideFuse} from "@fuse/fuse.provider";

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse & Fuse Mock API
        // FuseModule,
        //FuseConfigModule.forRoot(appConfig),
        //FuseMockApiModule.forRoot(mockApiServices),



        // Core
        CoreModule,

        // Layout
        LayoutModule,

        // 3rd party modules

        // Service Worker
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the app is stable
          // or after 30 seconds (whichever comes first).
          //registrationStrategy: 'registerWhenStable:30000'
          registrationStrategy: 'registerImmediately'
        })
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
        provideFuse({
            mockApi: {
                delay: 0,
                services: mockApiServices,
            },
            fuse: appConfig
        }),
    ]
})
export class AppModule
{
}
