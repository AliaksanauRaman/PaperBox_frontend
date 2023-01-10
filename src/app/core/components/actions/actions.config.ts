import { InjectionToken } from '@angular/core';

import { ViewName } from '../../../shared/enums/view-name.enum';

export type Action = Readonly<{
  label: string;
  relatedToView: ViewName;
}>;
export type Actions = ReadonlyArray<Action>;

export const ACTIONS = new InjectionToken<Actions>('ACTIONS');
export const ACTIONS_VALUE: Actions = [
  {
    label: 'Прапанаваць дапамогу',
    relatedToView: ViewName.HELP_OFFERS,
  },
  {
    label: 'Знайсці дапамогу',
    relatedToView: ViewName.HELP_REQUESTS,
  },
];
