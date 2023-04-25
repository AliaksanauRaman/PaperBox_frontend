import { DialogRef } from '@angular/cdk/dialog';

export abstract class DialogComponent<T = void> {
  constructor(protected readonly _dialogRef: DialogRef<T>) {}

  protected closeDialog(result?: T): void {
    if (result !== undefined) {
      this._dialogRef.close(result);
    } else {
      this._dialogRef.close();
    }
  }
}
