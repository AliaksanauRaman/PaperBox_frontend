import { LocalizationSource } from '@shared/enums/localization-source.enum';
import { LocalizationLanguage } from '@shared/enums/localization-language.enum';

export namespace Localizations {
  export class SelectOne {
    public static type = '[Localizations] Select One';
    constructor(public readonly localizationLanguage: LocalizationLanguage) {}
  }

  export class SaveSelectedLanguage {
    public static type = '(Side Effect) [Localizations] Save Selected Language';
    constructor(public readonly localizationLanguage: LocalizationLanguage) {}
  }
}
