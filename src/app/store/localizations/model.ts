import { ListOfLocalizations } from '@shared/models/localization.model';

export type LocalizationsStateModel = Readonly<{
  list: ListOfLocalizations;
}>;
