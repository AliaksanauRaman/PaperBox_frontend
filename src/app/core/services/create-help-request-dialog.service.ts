import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Store } from '@ngxs/store';
import { finalize } from 'rxjs';

import { CreateHelpRequestDialogComponent } from '../dialogs/create-help-request-dialog/create-help-request-dialog.component';

import { ResetCreateOneApplication } from '@store/create-one-application';
import { CUSTOM_DIALOG_PANEL_CLASS } from '@shared/constants/custom-dialog-panel-class';

@Injectable({
  providedIn: 'root',
})
export class CreateHelpRequestDialogService {
  private readonly _store = inject(Store);
  private readonly _dialog = inject(Dialog);

  public openDialog(): void {
    this._store
      .dispatch(new ResetCreateOneApplication())
      .pipe(
        finalize(() =>
          this._dialog.open(CreateHelpRequestDialogComponent, {
            panelClass: CUSTOM_DIALOG_PANEL_CLASS,
          })
        )
      )
      .subscribe();
  }
}
