import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { NewHelpOfferDialogComponent } from "../dialogs/new-help-offer-dialog/new-help-offer-dialog.component";

@Injectable({
  providedIn: 'root',
})
export class HelpOffersService {
  constructor(
    private readonly dialog: MatDialog,
  ) {}

  public openNewHelpOfferDialog(): void {
    this.dialog.open(NewHelpOfferDialogComponent);
  }
}
