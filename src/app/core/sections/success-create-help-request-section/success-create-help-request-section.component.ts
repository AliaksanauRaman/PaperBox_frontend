import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-success-create-help-request-section',
  templateUrl: './success-create-help-request-section.component.html',
  styleUrls: ['./success-create-help-request-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessCreateHelpRequestSectionComponent {
  @Input()
  public set helpRequestPublicId(value: string) {
    this._helpRequestPublicId = value;
  }

  @Output()
  public readonly ok = new EventEmitter<void>();

  protected _helpRequestPublicId = '';

  protected handleOk(): void {
    this.ok.emit();
  }
}
