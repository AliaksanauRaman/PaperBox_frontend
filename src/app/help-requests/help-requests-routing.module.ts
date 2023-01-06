import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HelpRequestsMainViewComponent } from './views/help-requests-main-view/help-requests-main-view.component';

const helpRequestsRoutes: Routes = [
  {
    path: '',
    component: HelpRequestsMainViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(helpRequestsRoutes)],
  exports: [RouterModule],
})
export class HelpRequestsRoutingModule {}
