import { Directive } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Directive({
  selector: '[appMatRipple]',
  standalone: true,
})
export class MatRippleDirective extends MatRipple {}
