import { InjectionToken } from '@angular/core';

import { NavigationLinkType } from '../../../shared/types/navigation-link.type';

export const NAVIGATION_LINKS = new InjectionToken<ReadonlyArray<NavigationLinkType>>('NAVIGATION_LINKS');

export const LIST_OF_NAVIGATION_LINKS: ReadonlyArray<NavigationLinkType> = [
  {
    label: 'Help offers',
    path: '/admin/help-offers',
    disabled: false,
  },
  {
    label: 'Help requests',
    path: '/admin/help-requests',
    disabled: true,
  },
];
