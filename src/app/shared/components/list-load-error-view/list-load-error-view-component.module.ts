import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ListLoadErrorViewComponent } from './list-load-error-view.component';

@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [ListLoadErrorViewComponent],
  providers: [],
  exports: [ListLoadErrorViewComponent],
})
export class ListLoadErrorViewComponentModule {}
