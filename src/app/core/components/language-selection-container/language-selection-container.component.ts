import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Observable } from 'rxjs';

import { LanguageSelectionComponent } from '../language-selection/language-selection.component';
import { SquareRoundedButtonComponent } from '@shared/components/square-rounded-button/square-rounded-button.component';

import { Localizations, LocalizationsState } from '@store/localizations';
import { ListOfLocalizations } from '@shared/models/localization.model';
import { LocalizationLanguage } from '@shared/enums/localization-language.enum';

@Component({
  selector: 'app-language-selection-container',
  templateUrl: 'language-selection-container.component.html',
  styleUrls: ['./language-selection-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    AngularSvgIconModule,
    LanguageSelectionComponent,
    SquareRoundedButtonComponent,
  ],
})
export class LanguageSelectionContainerComponent {
  private readonly _store = inject(Store);

  @Select(LocalizationsState.list)
  protected readonly _listOfLocalizations$!: Observable<ListOfLocalizations>;

  protected handleSelect(language: LocalizationLanguage): void {
    this._store.dispatch(new Localizations.SelectOne(language));
  }
}
