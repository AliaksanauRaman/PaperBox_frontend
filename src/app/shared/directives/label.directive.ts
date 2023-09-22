import { Directive, Input } from '@angular/core';

@Directive({
  standalone: true,
})
export class LabelDirective {
  @Input()
  public label = '';
}
