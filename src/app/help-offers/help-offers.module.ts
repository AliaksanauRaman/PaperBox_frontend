import { NgModule } from '@angular/core';

import { HelpOffersRoutingModule } from './help-offers-routing.module';

import { HelpOffersMainViewComponent } from './views/help-offers-main-view/help-offers-main-view.component';

import { HelpOffersListComponent } from './components/help-offers-list/help-offers-list.component';

@NgModule({
  imports: [HelpOffersRoutingModule],
  declarations: [HelpOffersMainViewComponent, HelpOffersListComponent],
  providers: [],
  exports: [],
})
export class HelpOffersModule {}
