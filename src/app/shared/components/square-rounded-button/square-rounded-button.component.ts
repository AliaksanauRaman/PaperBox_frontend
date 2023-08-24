import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';

import { MatRippleDirective } from '@shared/directives/mat-ripple.directive';
import { MatTooltipDirective } from '@shared/directives/mat-tooltip.directive';

@Component({
  selector: 'app-square-rounded-button',
  templateUrl: './square-rounded-button.component.html',
  styleUrls: ['./square-rounded-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    MatRippleDirective,
    {
      directive: MatTooltipDirective,
      inputs: ['tooltipText', 'tooltipDisabled'],
    },
  ],
  standalone: true,
  imports: [],
})
export class SquareRoundedButtonComponent {
  @HostBinding('attr.role')
  public readonly role = 'button';
}
