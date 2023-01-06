import { NgModule } from '@angular/core';

import { HelpRequestsRoutingModule } from './help-requests-routing.module';

import { HelpRequestsMainViewComponent } from './views/help-requests-main-view/help-requests-main-view.component';

@NgModule({
  imports: [HelpRequestsRoutingModule],
  declarations: [HelpRequestsMainViewComponent],
  providers: [],
  exports: [],
})
export class HelpRequestsModule {}
