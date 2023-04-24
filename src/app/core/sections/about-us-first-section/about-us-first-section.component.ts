import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about-us-first-section',
  templateUrl: './about-us-first-section.component.html',
  styleUrls: ['../../styles/about-us-section-common.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsFirstSectionComponent {}
