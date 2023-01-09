import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpOffersRoutingModule } from './help-offers-routing.module';

import { HelpOffersMainViewComponent } from './views/help-offers-main-view/help-offers-main-view.component';

import { HelpOffersListComponent } from './components/help-offers-list/help-offers-list.component';
import { HelpOffersListItemComponent } from './components/help-offers-list-item/help-offers-list-item.component';

@NgModule({
  imports: [CommonModule, HelpOffersRoutingModule],
  declarations: [
    HelpOffersMainViewComponent,
    HelpOffersListComponent,
    HelpOffersListItemComponent,
  ],
  providers: [],
  exports: [],
})
export class HelpOffersModule {}
