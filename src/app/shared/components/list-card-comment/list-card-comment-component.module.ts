import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ListCardCommentComponent } from './list-card-comment.component';

@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [ListCardCommentComponent],
  providers: [],
  exports: [ListCardCommentComponent],
})
export class ListCardCommentComponentModule {}
