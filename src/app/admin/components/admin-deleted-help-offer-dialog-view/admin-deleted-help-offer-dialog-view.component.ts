import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-deleted-help-offer-dialog-view',
  templateUrl: './admin-deleted-help-offer-dialog-view.component.html',
  styleUrls: ['./admin-deleted-help-offer-dialog-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDeletedHelpOfferDialogViewComponent {
  @Output()
  public readonly ok = new EventEmitter<void>();

  public handleOkButtonClick(): void {
    this.ok.emit();
  }
}
