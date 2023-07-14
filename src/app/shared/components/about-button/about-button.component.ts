import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { WhiteSquareButtonComponent } from '../white-square-button/white-square-button.component';

@Component({
  selector: 'app-about-button',
  templateUrl: './about-button.component.html',
  styleUrls: ['./about-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslateModule,
    MatTooltipModule,
    AngularSvgIconModule,
    WhiteSquareButtonComponent,
  ],
})
export class AboutButtonComponent {}
