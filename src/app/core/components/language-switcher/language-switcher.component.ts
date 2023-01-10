import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppLanguagesService } from '../../services/app-languages.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  public readonly languages$ = this.languagesService.languages$;

  constructor(private readonly languagesService: AppLanguagesService) {}

  public handleLanguageSelection(selectedLanguageValue: string): void {
    this.languagesService.selectLanguage(selectedLanguageValue);
  }
}
