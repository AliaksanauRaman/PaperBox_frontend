import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { z } from 'zod';

import { LOCAL_STORAGE } from '@core/dependencies/local-storage';

import { environment } from '../../../environments/environment';
import { LocalStorageKey } from '@shared/enums/local-storage-key.enum';

@Injectable({
  providedIn: 'root',
})
export class DevModeService {
  private readonly _localStorage = inject(LOCAL_STORAGE);

  private readonly _isProduction = environment.production;
  private readonly _isDevModeInitiallyOn =
    this.getIsDevModeFromLocalStorage() === true;
  private readonly _isDevMode$ = new BehaviorSubject<boolean>(
    !this._isProduction && this._isDevModeInitiallyOn
  );

  public isOn(): boolean {
    return this._isDevMode$.getValue();
  }

  public switchOn(): void {
    if (this._isProduction) {
      return;
    }

    this._isDevMode$.next(true);
    this.updateInLocalStorage(true);
  }

  public switchOff(): void {
    this._isDevMode$.next(false);
    this.updateInLocalStorage(false);
  }

  private getIsDevModeFromLocalStorage(): boolean | null {
    const isDevMode = this._localStorage.getItem(
      LocalStorageKey.PUSHKA_DEV_MODE
    );

    if (isDevMode === null) {
      return null;
    }

    return z.boolean().parse(JSON.parse(isDevMode));
  }

  private updateInLocalStorage(newValue: boolean): void {
    this._localStorage.setItem(
      LocalStorageKey.PUSHKA_DEV_MODE,
      JSON.stringify(newValue)
    );
  }
}
