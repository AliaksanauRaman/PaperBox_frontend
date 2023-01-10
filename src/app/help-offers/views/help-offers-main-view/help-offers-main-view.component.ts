import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';

import { ActiveViewService } from '../../../core/services/active-view.service';

import { ViewName } from '../../../shared/enums/view-name.enum';

@Component({
  selector: 'app-help-offers-main-view',
  templateUrl: './help-offers-main-view.component.html',
  styleUrls: ['./help-offers-main-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpOffersMainViewComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(private readonly activeViewService: ActiveViewService) {}

  // TODO: Empty
  public ngOnInit(): void {}

  // TODO: Strange workaround, it is better to find a better solution
  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.activeViewService.setActiveView(ViewName.HELP_OFFERS);
    });
  }

  public ngOnDestroy(): void {
    this.activeViewService.resetActiveView();
  }
}
