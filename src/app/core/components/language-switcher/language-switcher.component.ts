import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AppLanguagesService } from '../../services/app-languages.service';

import { AppLanguage } from '../../../shared/types/app-language.type';
import { AppLanguageValue } from '../../../shared/enums/app-language-value.enum';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// TODO: Refactor this
export class LanguageSwitcherComponent {
  @Input()
  public set isCompact(value: boolean) {
    this._isCompact = value;
  }

  public _isCompact = false;

  constructor(public readonly languagesService: AppLanguagesService) {}

  public handleSingleLanguageClick(): void {
    this.languagesService.selectNextLanguage();
  }

  public handleLanguageOptionClick(clickedLanguageValue: string): void {
    this.languagesService.selectLanguage(clickedLanguageValue);
  }

  public trackLanguageByValue(
    _languageIndex: number,
    language: AppLanguage
  ): AppLanguageValue {
    return language.value;
  }
}
