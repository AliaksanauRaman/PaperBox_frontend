import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';

import { SpinnerModule } from '../shared/components/spinner/spinner.module';
import { FoldableComponentModule } from '../shared/components/foldable/foldable-component.module';
import { ArrowDownIconModule } from '../shared/icons/arrow-down-icon/arrow-down-icon.module';
import { LaconicPlaceLabelFromLocationValuePipeModule } from '../shared/pipes/laconic-place-label-from-location-value/laconic-place-label-from-location-value-pipe.module';
import { BuildPhoneHrefPipeModule } from '../shared/pipes/build-phone-href/build-phone-href-pipe.module';
import { ViewPhonePipeModule } from '../shared/pipes/view-phone/view-phone-pipe.module';
import { HoverableDirectiveModule } from '../shared/directives/hoverable/hoverable-directive.module';
import { HelpRequestsRoutingModule } from './help-requests-routing.module';

import { HelpRequestsMainViewComponent } from './views/help-requests-main-view/help-requests-main-view.component';

import { HelpRequestsListComponent } from './components/help-requests-list/help-requests-list.component';
import { HelpRequestsListItemComponent } from './components/help-requests-list-item/help-requests-list-item.component';

import { HelpRequestsEventsProcessorService } from './services/help-requests-events-processor.service';

@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
    TranslateModule,
    SpinnerModule,
    FoldableComponentModule,
    ArrowDownIconModule,
    LaconicPlaceLabelFromLocationValuePipeModule,
    BuildPhoneHrefPipeModule,
    ViewPhonePipeModule,
    HoverableDirectiveModule,
    HelpRequestsRoutingModule,
  ],
  declarations: [
    HelpRequestsMainViewComponent,
    HelpRequestsListComponent,
    HelpRequestsListItemComponent,
  ],
  providers: [HelpRequestsEventsProcessorService],
  exports: [],
})
export class HelpRequestsModule {
  constructor(
    private readonly helpRequestsEventsProcessorService: HelpRequestsEventsProcessorService
  ) {
    this.helpRequestsEventsProcessorService.setUpProcessors();
  }
}
