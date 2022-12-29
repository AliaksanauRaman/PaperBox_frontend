import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { LIST_OF_NAVIGATION_LINKS, NAVIGATION_LINKS } from './admin-work-page-toolbar.config';
import { NavigationLinkType } from '../../../shared/types/navigation-link.type';

@Component({
  selector: 'app-admin-work-page-header',
  templateUrl: './admin-work-page-header.component.html',
  styleUrls: ['./admin-work-page-header.component.scss'],
  providers: [
    {
      provide: NAVIGATION_LINKS,
      useValue: LIST_OF_NAVIGATION_LINKS,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminWorkPageHeaderComponent {
  constructor(
    @Inject(NAVIGATION_LINKS)
    public readonly navigationLinks: ReadonlyArray<NavigationLinkType>,
  ) {}
}
