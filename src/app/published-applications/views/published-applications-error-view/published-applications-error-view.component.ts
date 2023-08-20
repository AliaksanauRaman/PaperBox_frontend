import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-published-applications-error-view',
  templateUrl: './published-applications-error-view.component.html',
  styleUrls: ['./published-applications-error-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslateModule, AngularSvgIconModule],
})
export class PublishedApplicationsErrorViewComponent {
  @Output()
  public readonly reloadClick = new EventEmitter<void>();
}
