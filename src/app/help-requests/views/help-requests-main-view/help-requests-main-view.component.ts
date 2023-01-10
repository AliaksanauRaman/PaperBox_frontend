import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { ActiveViewService } from '../../../core/services/active-view.service';

import { ViewName } from '../../../shared/enums/view-name.enum';

@Component({
  selector: 'app-help-requests-main-view',
  templateUrl: './help-requests-main-view.component.html',
  styleUrls: ['./help-requests-main-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpRequestsMainViewComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(private readonly activeViewService: ActiveViewService) {}

  // TODO: Empty
  public ngOnInit(): void {}

  // TODO: Strange workaround, it is better to find a better solution
  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.activeViewService.setActiveView(ViewName.HELP_REQUESTS);
    });
  }

  public ngOnDestroy(): void {
    this.activeViewService.resetActiveView();
  }
}
