import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { DateControlModule } from './shared/components/date-control/date-control.module';
import { InputControlModule } from './shared/components/input-control/input-control.module';

import { AppComponent } from './app.component';
import { IndexPageLayoutComponent } from './core/layouts/index-page-layout/index-page-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { HelpOffersBoardComponent } from './components/help-offers-board/help-offers-board.component';
import { HelpRequestsBoardComponent } from './components/help-requests-board/help-requests-board.component';
import { GridOfHelpOffersComponent } from './components/grid-of-help-offers/grid-of-help-offers.component';
import { PublicHelpOfferCardComponent } from './components/public-help-offer-card/public-help-offer-card.component';
import { HelpOffersBoardHeaderComponent } from './components/help-offers-board-header/help-offers-board-header.component';
import { NewHelpOfferDialogComponent } from './dialogs/new-help-offer-dialog/new-help-offer-dialog.component';
import { HelpOffersPageComponent } from './pages/help-offers-page/help-offers-page.component';
import { HelpRequestsPageComponent } from './pages/help-requests-page/help-requests-page.component';
import { InnerPageLayoutComponent } from './layouts/inner-page-layout/inner-page-layout.component';

import { API_URL, API_URL_VALUE } from './shared/dependencies/api-url';
import { translateLoaderFactory } from './core/factories/translate-loader.factory';

@NgModule({
  declarations: [
    AppComponent,
    IndexPageLayoutComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    HelpOffersBoardComponent,
    HelpRequestsBoardComponent,
    GridOfHelpOffersComponent,
    PublicHelpOfferCardComponent,
    HelpOffersBoardHeaderComponent,
    NewHelpOfferDialogComponent,
    HelpOffersPageComponent,
    HelpRequestsPageComponent,
    InnerPageLayoutComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    InputControlModule,
    DateControlModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: API_URL,
      useValue: API_URL_VALUE,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
