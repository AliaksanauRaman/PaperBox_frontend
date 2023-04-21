import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatRippleModule } from '@angular/material/core';

import { ArrowDownIconModule } from '../shared/icons/arrow-down-icon/arrow-down-icon.module';
import { SpinnerModule } from '../shared/components/spinner/spinner.module';
import { LaconicPlaceLabelFromLocationValuePipeModule } from '../shared/pipes/laconic-place-label-from-location-value/laconic-place-label-from-location-value-pipe.module';
import { BuildPhoneHrefPipeModule } from '../shared/pipes/build-phone-href/build-phone-href-pipe.module';
import { ViewPhonePipeModule } from '../shared/pipes/view-phone/view-phone-pipe.module';
import { FoldableComponentModule } from '../shared/components/foldable/foldable-component.module';
import { ListCardCommentComponentModule } from '../shared/components/list-card-comment/list-card-comment-component.module';
import { ListLoadErrorViewComponentModule } from '../shared/components/list-load-error-view/list-load-error-view-component.module';
import { HoverableDirectiveModule } from '../shared/directives/hoverable/hoverable-directive.module';
import { DatesPipe } from '../shared/pipes/dates.pipe';
import { HelpOffersRoutingModule } from './help-offers-routing.module';

import { HelpOffersMainViewComponent } from './views/help-offers-main-view/help-offers-main-view.component';

import { HelpOffersListComponent } from './components/help-offers-list/help-offers-list.component';
import { HelpOffersListItemComponent } from './components/help-offers-list-item/help-offers-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatRippleModule,
    ArrowDownIconModule,
    SpinnerModule,
    LaconicPlaceLabelFromLocationValuePipeModule,
    BuildPhoneHrefPipeModule,
    ViewPhonePipeModule,
    FoldableComponentModule,
    ListCardCommentComponentModule,
    ListLoadErrorViewComponentModule,
    HoverableDirectiveModule,
    DatesPipe,
    HelpOffersRoutingModule,
  ],
  declarations: [
    HelpOffersMainViewComponent,
    HelpOffersListComponent,
    HelpOffersListItemComponent,
  ],
  providers: [],
  exports: [],
})
export class HelpOffersModule {}
