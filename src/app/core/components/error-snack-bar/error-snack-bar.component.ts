import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-snack-bar',
  templateUrl: './error-snack-bar.component.html',
  styleUrls: ['./error-snack-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorSnackBarComponent {
  constructor(
    @Inject(MatSnackBarRef)
    private readonly matSnackBarRef: MatSnackBarRef<unknown>,
    @Inject(MAT_SNACK_BAR_DATA)
    protected readonly errorMessageTranslateKey: string
  ) {}

  protected handleCloseButtonClick(): void {
    this.matSnackBarRef.dismiss();
  }
}
