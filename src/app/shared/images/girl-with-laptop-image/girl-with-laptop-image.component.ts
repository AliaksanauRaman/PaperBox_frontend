import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-girl-with-laptop-image',
  templateUrl: './girl-with-laptop-image.component.html',
  styleUrls: ['./girl-with-laptop-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class GirlWithLaptopImageComponent {}
