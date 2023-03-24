import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-info-snack-bar',
  templateUrl: './info-snack-bar.component.html',
  styleUrls: ['./info-snack-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoSnackBarComponent {
  constructor(
    @Inject(MatSnackBarRef)
    private readonly matSnackBarRef: MatSnackBarRef<unknown>,
    @Inject(MAT_SNACK_BAR_DATA)
    protected readonly infoMessageTranslateKey: string
  ) {}

  protected handleCloseButtonClick(): void {
    this.matSnackBarRef.dismiss();
  }
}
