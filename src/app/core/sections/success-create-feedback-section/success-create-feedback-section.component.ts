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
  @HostListener('document:keyup.enter', ['$event'])
  private handleEnterPress(event: KeyboardEvent): void {
    event.preventDefault();
    this.enterPress.emit();
  }

  @Output()
  public readonly enterPress = new EventEmitter<void>();
}
