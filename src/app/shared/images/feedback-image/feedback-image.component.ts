import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-feedback-image',
  templateUrl: './feedback-image.component.html',
  styleUrls: ['./feedback-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FeedbackImageComponent {}
