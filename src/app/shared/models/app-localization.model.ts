import { Selectable } from '@shared/utility-types/selectable.utility-type';
import { LocalizationType } from '@shared/types/localization.type';

export type Localization = Selectable<LocalizationType>;
export type ListOfLocalizations = ReadonlyArray<Localization>;
