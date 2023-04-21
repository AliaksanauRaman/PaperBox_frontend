import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';

import { SpinnerModule } from '../shared/components/spinner/spinner.module';
import { FoldableComponentModule } from '../shared/components/foldable/foldable-component.module';
import { ListCardCommentComponentModule } from '../shared/components/list-card-comment/list-card-comment-component.module';
import { ListLoadErrorViewComponentModule } from '../shared/components/list-load-error-view/list-load-error-view-component.module';
import { ArrowDownIconModule } from '../shared/icons/arrow-down-icon/arrow-down-icon.module';
import { LaconicPlaceLabelFromLocationValuePipeModule } from '../shared/pipes/laconic-place-label-from-location-value/laconic-place-label-from-location-value-pipe.module';
import { BuildPhoneHrefPipeModule } from '../shared/pipes/build-phone-href/build-phone-href-pipe.module';
import { ViewPhonePipeModule } from '../shared/pipes/view-phone/view-phone-pipe.module';
import { HoverableDirectiveModule } from '../shared/directives/hoverable/hoverable-directive.module';
import { DatesPipe } from '../shared/pipes/dates.pipe';
import { HelpRequestsRoutingModule } from './help-requests-routing.module';

import { HelpRequestsMainViewComponent } from './views/help-requests-main-view/help-requests-main-view.component';

import { HelpRequestsListComponent } from './components/help-requests-list/help-requests-list.component';
import { HelpRequestsListItemComponent } from './components/help-requests-list-item/help-requests-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
    TranslateModule,
    SpinnerModule,
    FoldableComponentModule,
    ListCardCommentComponentModule,
    ListLoadErrorViewComponentModule,
    ArrowDownIconModule,
    LaconicPlaceLabelFromLocationValuePipeModule,
    BuildPhoneHrefPipeModule,
    ViewPhonePipeModule,
    HoverableDirectiveModule,
    DatesPipe,
    HelpRequestsRoutingModule,
  ],
  declarations: [
    HelpRequestsMainViewComponent,
    HelpRequestsListComponent,
    HelpRequestsListItemComponent,
  ],
  providers: [],
  exports: [],
})
// TODO: There is no need in separated HelpOffersModule and HelpRequestsModule
export class HelpRequestsModule {}
