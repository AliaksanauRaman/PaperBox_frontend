import { TemplateRef } from '@angular/core';

export type ConfirmDialogDataType<T = unknown> = Readonly<{
  content?: TemplateRef<T>;
  isDanger?: boolean;
}>;
