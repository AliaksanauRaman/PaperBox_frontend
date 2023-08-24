import { Directive, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appMatTooltip]',
  standalone: true,
})
export class MatTooltipDirective extends MatTooltip {
  @Input()
  public set tooltipText(value: string) {
    this.message = value;
  }

  @Input()
  public set tooltipDisabled(value: boolean) {
    this.disabled = value;
  }
}
