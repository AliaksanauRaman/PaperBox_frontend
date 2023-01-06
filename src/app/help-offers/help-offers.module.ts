import { NgModule } from '@angular/core';

import { HelpOffersRoutingModule } from './help-offers-routing.module';

import { HelpOffersMainViewComponent } from './views/help-offers-main-view/help-offers-main-view.component';

@NgModule({
  imports: [HelpOffersRoutingModule],
  declarations: [HelpOffersMainViewComponent],
  providers: [],
  exports: [],
})
export class HelpOffersModule {}
