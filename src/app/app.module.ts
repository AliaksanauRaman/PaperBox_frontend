import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClientModule,
  HttpBackend,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { API_URL, API_URL_VALUE } from './shared/dependencies/api-url';
import { translateLoaderFactory } from './core/factories/translate-loader.factory';
import { AuthorizationInterceptor } from './core/interceptors/authorization.interceptor';
import { LoadingOverlayInterceptor } from './core/interceptors/loading-overlay.interceptor';

import { STORE } from './store';
import { INIT_APP_FACTORY_PROVIDER } from './init-app.factory';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    NgxsModule.forRoot(STORE),
    NgxsLoggerPluginModule.forRoot({
      collapsed: true,
      disabled: environment.production,
    }),

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
    INIT_APP_FACTORY_PROVIDER,
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
