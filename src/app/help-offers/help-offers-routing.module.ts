import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpOffersMainViewComponent } from './views/help-offers-main-view/help-offers-main-view.component';

const helpOffersRoutes: Routes = [
  {
    path: '',
    component: HelpOffersMainViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(helpOffersRoutes)],
  exports: [RouterModule],
})
export class HelpOffersRoutingModule {}
