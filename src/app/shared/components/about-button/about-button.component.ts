import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { WhiteSquareButtonComponent } from '../white-square-button/white-square-button.component';

@Component({
  selector: 'app-about-button',
  templateUrl: './about-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [TranslateModule, WhiteSquareButtonComponent],
})
export class AboutButtonComponent {}
