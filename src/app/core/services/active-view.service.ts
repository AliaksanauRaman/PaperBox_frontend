import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ViewName } from '../../shared/enums/view-name.enum';

@Injectable({
  providedIn: 'root',
})
export class ActiveViewService {
  private readonly _activeView$ = new BehaviorSubject<ViewName>(
    ViewName.UNKNOWN
  );

  public readonly activeView$ = this._activeView$.asObservable();

  public setActiveView(viewName: ViewName): void {
    this._activeView$.next(viewName);
  }

  public resetActiveView(): void {
    this._activeView$.next(ViewName.UNKNOWN);
  }
}
