import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-leave-feedback-button',
  templateUrl: './leave-feedback-button.component.html',
  styleUrls: ['./leave-feedback-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaveFeedbackButtonComponent {}
