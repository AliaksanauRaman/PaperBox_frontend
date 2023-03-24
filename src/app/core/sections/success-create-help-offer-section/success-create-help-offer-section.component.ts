import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-success-create-help-offer-section',
  templateUrl: './success-create-help-offer-section.component.html',
  styleUrls: ['./success-create-help-offer-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessCreateHelpOfferSectionComponent {
  @Input()
  public set helpOfferPublicId(value: string) {
    this._helpOfferPublicId = value;
  }

  @Output()
  public readonly ok = new EventEmitter<void>();

  protected _helpOfferPublicId = '';

  protected handleOk(): void {
    this.ok.emit();
  }
}
