import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-empty-list-of-published-applications',
  templateUrl: './empty-list-of-published-applications.component.html',
  styleUrls: ['./empty-list-of-published-applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslateModule],
})
export class EmptyListOfPublishedApplicationsComponent {}
