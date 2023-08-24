import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgFor } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { MatRippleModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { SquareRoundedButtonComponent } from '@shared/components/square-rounded-button/square-rounded-button.component';

import {
  Localization,
  ListOfLocalizations,
} from '@shared/models/localization.model';
import { LocalizationLanguage } from '@shared/enums/localization-language.enum';

@Component({
  selector: 'app-language-selection',
  templateUrl: 'language-selection.component.html',
  styleUrls: ['./language-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgFor,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    MatRippleModule,
    TranslateModule,
    AngularSvgIconModule,
    SquareRoundedButtonComponent,
  ],
})
export class LanguageSelectionComponent {
  @Input()
  public set listOfLocalizations(listOfLocalizations: ListOfLocalizations) {
    this._listOfLocalizations = listOfLocalizations;
  }

  @Output()
  public select = new EventEmitter<LocalizationLanguage>();

  protected _listOfLocalizations: ListOfLocalizations = [];
  protected _isMenuOpened = false;

  protected handleMenuOpened(): void {
    this._isMenuOpened = true;
  }

  protected handleMenuClosed(): void {
    this._isMenuOpened = false;
  }

  protected trackByLocalizationLanguage(
    _index: number,
    localization: Localization
  ): LocalizationLanguage {
    return localization.language;
  }
}
