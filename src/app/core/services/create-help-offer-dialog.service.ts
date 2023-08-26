import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Store } from '@ngxs/store';
import { finalize } from 'rxjs';

import { CreateHelpOfferDialogComponent } from '../dialogs/create-help-offer-dialog/create-help-offer-dialog.component';

import { PublishedHelpOffers } from '@store/published-help-offers';
import { CUSTOM_DIALOG_PANEL_CLASS } from '@shared/constants/custom-dialog-panel-class';

@Injectable({
  providedIn: 'root',
})
export class CreateHelpOfferDialogService {
  private readonly _store = inject(Store);
  private readonly _dialog = inject(Dialog);

  public openDialog(): void {
    this._store
      .dispatch(new PublishedHelpOffers.ResetCreateOne())
      .pipe(
        finalize(() =>
          this._dialog.open(CreateHelpOfferDialogComponent, {
            panelClass: CUSTOM_DIALOG_PANEL_CLASS,
          })
        )
      )
      .subscribe();
  }
}
