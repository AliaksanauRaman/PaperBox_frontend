import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { WhiteSquareButtonComponent } from '../white-square-button/white-square-button.component';

@Component({
  selector: 'app-account-button',
  templateUrl: './account-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NgTemplateOutlet, TranslateModule, WhiteSquareButtonComponent],
})
export class AccountButtonComponent {}
