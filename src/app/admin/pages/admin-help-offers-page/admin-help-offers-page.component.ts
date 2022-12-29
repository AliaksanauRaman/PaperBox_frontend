import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';

import { AdminHelpOffersService } from '../../services/admin-help-offers.service';

import { DestroyEmitter } from '../../../shared/abstracts/destroy-emitter.class';
import { HttpRequestStateName } from '../../../shared/enums/http-request-state-name.enum';

@Component({
  selector: 'app-admin-help-offers-page',
  templateUrl: './admin-help-offers-page.component.html',
  styleUrls: ['./admin-help-offers-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHelpOffersPageComponent
  extends DestroyEmitter
  implements OnInit
{
  public readonly getFullPreviewsOfAllRequestStateStream =
    this.adminHelpOffersService.getFullPreviewsOfAllRequestStateStream;
  public readonly httpRequestStateName = HttpRequestStateName;

  constructor(private readonly adminHelpOffersService: AdminHelpOffersService) {
    super();
  }

  public ngOnInit(): void {
    this.adminHelpOffersService
      .makeGetFullPreviewsOfAllRequest()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
