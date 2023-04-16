import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-success-create-feedback-section',
  templateUrl: './success-create-feedback-section.component.html',
  styleUrls: ['./success-create-feedback-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessCreateFeedbackSectionComponent {
  @Output()
  public readonly ok = new EventEmitter<void>();

  @HostListener('document:keyup.enter', ['$event'])
  protected handleEnterPress(event: KeyboardEvent): void {
    event.preventDefault();
    this.ok.emit();
  }

  protected handleGladToHelpButtonClick(): void {
    this.ok.emit();
  }
}
