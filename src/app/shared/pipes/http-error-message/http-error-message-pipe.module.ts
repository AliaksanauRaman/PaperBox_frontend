import { NgModule } from '@angular/core';

import { HttpErrorMessagePipe } from './http-error-message.pipe';

@NgModule({
  imports: [],
  declarations: [HttpErrorMessagePipe],
  exports: [HttpErrorMessagePipe],
})
export class HttpErrorMessagePipeModule {}
