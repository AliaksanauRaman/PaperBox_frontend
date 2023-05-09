import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatRippleModule } from '@angular/material/core';

import { FoldableComponentModule } from '../shared/components/foldable/foldable-component.module';
import { ListCardCommentComponentModule } from '../shared/components/list-card-comment/list-card-comment-component.module';
import { SpinnerModule } from '../shared/components/spinner/spinner.module';
import { ArrowDownIconModule } from '../shared/icons/arrow-down-icon/arrow-down-icon.module';
import { DeleteButtonComponent } from '../shared/components/delete-button/delete-button.component';
import { LocationLabelPipe } from '../shared/pipes/location-label.pipe';
import { DatesPipe } from '../shared/pipes/dates.pipe';
import { PhoneHrefPipe } from '../shared/pipes/phone-href.pipe';
import { PhoneViewPipe } from '../shared/pipes/phone-view.pipe';
import { HoverDirective } from '../shared/directives/hover.directive';

import { HelpOffersPageComponent } from './pages/help-offers-page/help-offers-page.component';
import { HelpRequestsPageComponent } from './pages/help-requests-page/help-requests-page.component';
import { ApplicationsListLoadErrorViewComponent } from './views/applications-list-load-error-view/applications-list-load-error-view.component';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';
import { ApplicationsListItemComponent } from './components/applications-list-item/applications-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    AngularSvgIconModule,
    TranslateModule,
    MatRippleModule,
    FoldableComponentModule,
    ListCardCommentComponentModule,
    SpinnerModule,
    ArrowDownIconModule,
    DeleteButtonComponent,
    LocationLabelPipe,
    DatesPipe,
    PhoneHrefPipe,
    PhoneViewPipe,
    HoverDirective,
  ],
  declarations: [
    HelpOffersPageComponent,
    HelpRequestsPageComponent,
    ApplicationsListLoadErrorViewComponent,
    ApplicationsListComponent,
    ApplicationsListItemComponent,
  ],
})
export class ApplicationsModule {}
