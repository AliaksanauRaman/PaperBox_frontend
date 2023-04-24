import { Injectable } from '@angular/core';

import { DialogService } from '../../shared/abstracts/dialog.service';

import { AboutUsDialogComponent } from '../dialogs/about-us-dialog/about-us-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AboutUsDialogService extends DialogService {
  public openDialog(): void {
    this._dialog.open(AboutUsDialogComponent, {
      panelClass: 'about-us-dialog',
      backdropClass: 'about-us-dialog-backdrop',
    });
  }
}
