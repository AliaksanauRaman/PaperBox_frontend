import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-girl-in-card-image',
  templateUrl: './girl-in-card-image.component.html',
  styleUrls: ['./girl-in-card-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class GirlInCardImageComponent {}
