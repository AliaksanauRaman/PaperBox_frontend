import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

import { WhiteSquareButtonComponent } from '../white-square-button/white-square-button.component';

import { AppLanguagesService } from '../../../core/services/app-languages.service';

import { AppLanguage } from '../../types/app-language.type';
import { AppLanguageValue } from '../../enums/app-language-value.enum';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgFor,
    MatRippleModule,
    WhiteSquareButtonComponent,
  ],
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
