import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { LOCAL_STORAGE } from '@core/dependencies/local-storage';

import {
  Localization,
  ListOfLocalizations,
} from '@shared/models/localization.model';
import { select } from '@shared/utils/select.util';
import { deselect } from '@shared/utils/deselect.util';
import { LocalizationSource } from '@shared/enums/localization-source.enum';
import { LocalStorageKey } from '@shared/enums/local-storage-key.enum';
import { LocalizationsStateModel } from './model';
import { LOCALIZATIONS_DEFAULTS } from './defaults';
import { Localizations } from './actions';

type StateModel = LocalizationsStateModel;

@State<StateModel>({
  name: 'localizations',
  defaults: LOCALIZATIONS_DEFAULTS,
})
@Injectable({
  providedIn: 'root',
})
export class LocalizationsState {
  private readonly _localStorage = inject(LOCAL_STORAGE);

  @Selector()
  public static current(state: StateModel): Localization {
    const currentLocalization = state.list.find(({ isSelected }) => isSelected);

    if (currentLocalization === undefined) {
      throw new Error('There must always be a selected localization!');
    }

    return currentLocalization;
  }

  @Selector()
  public static list(state: StateModel): ListOfLocalizations {
    return state.list;
  }

  @Action(Localizations.Init)
  public initLocalizations(
    context: StateContext<StateModel>,
    action: Localizations.Init
  ): void {
    const state = context.getState();
    const newList = state.list.map((localization) => {
      if (localization.language === action.localizationLanguage) {
        return select(localization);
      }

      return deselect(localization);
    });

    context.setState({
      ...state,
      source: action.source,
      list: newList,
    });
  }

  @Action(Localizations.SelectOne)
  public selectOneLocalization(
    context: StateContext<StateModel>,
    action: Localizations.SelectOne
  ): void {
    const state = context.getState();
    const newList = state.list.map((localization) => {
      if (localization.language === action.localizationLanguage) {
        return select(localization);
      }

      return deselect(localization);
    });

    context.setState({
      ...state,
      source: LocalizationSource.SELECTED,
      list: newList,
    });
    context.dispatch(
      new Localizations.SaveSelectedLanguage(action.localizationLanguage)
    );
  }

  @Action(Localizations.SaveSelectedLanguage)
  public saveSelectedLanguage(
    _context: StateContext<StateModel>,
    action: Localizations.SaveSelectedLanguage
  ): void {
    this._localStorage.setItem(
      LocalStorageKey.PUSHKA_LANGUAGE,
      action.localizationLanguage
    );
  }
}
