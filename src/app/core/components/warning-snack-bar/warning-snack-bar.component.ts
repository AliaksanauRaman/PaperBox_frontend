import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-warning-snack-bar',
  templateUrl: './warning-snack-bar.component.html',
  styleUrls: ['./warning-snack-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarningSnackBarComponent {
  constructor(
    @Inject(MatSnackBarRef)
    private readonly matSnackBarRef: MatSnackBarRef<unknown>,
    @Inject(MAT_SNACK_BAR_DATA)
    protected readonly warningMessageTranslateKey: string
  ) {}

  protected handleCloseButtonClick(): void {
    this.matSnackBarRef.dismiss();
  }
}
