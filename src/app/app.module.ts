import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main/main-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { HelpOffersBoardComponent } from './components/help-offers-board/help-offers-board.component';
import { HelpRequestsBoardComponent } from './components/help-requests-board/help-requests-board.component';
import { GridOfHelpOffersComponent } from './components/grid-of-help-offers/grid-of-help-offers.component';
import { HelpOfferCardComponent } from './components/help-offer-card/help-offer-card.component';
import { HelpOffersBoardHeaderComponent } from './components/help-offers-board-header/help-offers-board-header.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    HelpOffersBoardComponent,
    HelpRequestsBoardComponent,
    GridOfHelpOffersComponent,
    HelpOfferCardComponent,
    HelpOffersBoardHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
