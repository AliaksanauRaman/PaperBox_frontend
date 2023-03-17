import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-man-with-globe-image',
  templateUrl: './man-with-globe-image.component.html',
  styleUrls: ['./man-with-globe-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ManWithGlobeImageComponent {}
