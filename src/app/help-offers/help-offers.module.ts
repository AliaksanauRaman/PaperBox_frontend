import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArrowDownIconModule } from '../shared/icons/arrow-down-icon/arrow-down-icon.module';
import { HelpOffersRoutingModule } from './help-offers-routing.module';

import { HelpOffersMainViewComponent } from './views/help-offers-main-view/help-offers-main-view.component';

import { HelpOffersListComponent } from './components/help-offers-list/help-offers-list.component';
import { HelpOffersListItemComponent } from './components/help-offers-list-item/help-offers-list-item.component';

@NgModule({
  imports: [CommonModule, ArrowDownIconModule, HelpOffersRoutingModule],
  declarations: [
    HelpOffersMainViewComponent,
    HelpOffersListComponent,
    HelpOffersListItemComponent,
  ],
  providers: [],
  exports: [],
})
export class HelpOffersModule {}
