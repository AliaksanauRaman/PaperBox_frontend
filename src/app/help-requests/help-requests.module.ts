import { NgModule } from '@angular/core';

import { HelpRequestsRoutingModule } from './help-requests-routing.module';

import { HelpRequestsMainViewComponent } from './views/help-requests-main-view/help-requests-main-view.component';

import { HelpRequestsListComponent } from './components/help-requests-list/help-requests-list.component';
import { HelpRequestsListItemComponent } from './components/help-requests-list-item/help-requests-list-item.component';

@NgModule({
  imports: [HelpRequestsRoutingModule],
  declarations: [HelpRequestsMainViewComponent, HelpRequestsListComponent, HelpRequestsListItemComponent],
  providers: [],
  exports: [],
})
export class HelpRequestsModule {}
