import { LocalizationSource } from '@shared/enums/localization-source.enum';
import { ListOfLocalizations } from '@shared/models/localization.model';

export type LocalizationsStateModel = Readonly<{
  source: LocalizationSource;
  list: ListOfLocalizations;
}>;
