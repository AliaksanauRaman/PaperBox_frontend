import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-feedbacks-page',
  templateUrl: './admin-feedbacks-page.component.html',
  styleUrls: ['../../styles/_admin-page-common.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFeedbacksPageComponent {}
