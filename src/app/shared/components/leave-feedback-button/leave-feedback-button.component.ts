import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { WhiteSquareButtonComponent } from '../white-square-button/white-square-button.component';
import { FeedbackImageComponent } from '../../images/feedback-image/feedback-image.component';

@Component({
  selector: 'app-leave-feedback-button',
  templateUrl: './leave-feedback-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    TranslateModule,
    MatTooltipModule,
    WhiteSquareButtonComponent,
    FeedbackImageComponent,
  ],
})
export class LeaveFeedbackButtonComponent {}
