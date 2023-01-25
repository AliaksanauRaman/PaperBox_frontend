import { DialogRef } from '@angular/cdk/dialog';

import { DestroyEmitter } from './destroy-emitter.class';

export class DialogComponent extends DestroyEmitter {
  constructor(protected readonly dialogRef: DialogRef<void>) {
    super();
  }

  protected closeDialog(): void {
    this.dialogRef.close();
  }
}
