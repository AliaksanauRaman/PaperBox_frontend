import { DialogRef } from '@angular/cdk/dialog';

export class DialogComponent {
  constructor(protected readonly dialogRef: DialogRef<void>) {}

  protected closeDialog(): void {
    this.dialogRef.close();
  }
}
