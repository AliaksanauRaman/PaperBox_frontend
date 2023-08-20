import { Directive, OnDestroy, OnInit, inject } from '@angular/core';

import { PublishedApplicationsService } from '../services/published-applications.service';

@Directive()
export abstract class PublishedApplicationsPageComponent
  implements OnInit, OnDestroy
{
  protected readonly _publishedApplicationsService = inject(
    PublishedApplicationsService
  );

  protected readonly _data$ = this._publishedApplicationsService.data$;

  public ngOnInit(): void {
    this._publishedApplicationsService.get();
  }

  public ngOnDestroy(): void {
    this._publishedApplicationsService.destroyGet();
  }

  protected handleReloadClick(): void {
    this._publishedApplicationsService.get();
  }
}
