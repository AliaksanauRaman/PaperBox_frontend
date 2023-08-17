import { NgModule, APP_INITIALIZER } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClientModule,
  HttpBackend,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { CoreModule } from './core/core.module';
import { ApplicationsModule } from './applications/applications.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { UserTokenInitializerService } from './core/services/user-token-initializer.service';
import { UserTokenUpdatesListenerService } from './core/services/user-token-updates-listener.service';
import { UserUpdatesListenerService } from './core/services/user-updates-listener.service';
import { ImagesService } from './shared/services/images.service';

import { API_URL, API_URL_VALUE } from './shared/dependencies/api-url';
import { translateLoaderFactory } from './core/factories/translate-loader.factory';
import { AuthorizationInterceptor } from './core/interceptors/authorization.interceptor';
import { LoadingOverlayInterceptor } from './core/interceptors/loading-overlay.interceptor';

import { STORE } from './store';
import { initAppFactory } from './init-app.factory';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    ApplicationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    NgxsModule.forRoot(STORE),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpBackend],
      },
    }),

    AngularSvgIconModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAppFactory,
      deps: [
        UserTokenInitializerService,
        UserTokenUpdatesListenerService,
        UserUpdatesListenerService,
        ImagesService,
      ],
      multi: true,
    },
    {
      provide: API_URL,
      useValue: API_URL_VALUE,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingOverlayInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
