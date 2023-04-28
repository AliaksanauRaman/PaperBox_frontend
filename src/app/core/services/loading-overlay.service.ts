import { Injectable, ViewContainerRef } from '@angular/core';

import { LoadingOverlayComponent } from '../components/loading-overlay/loading-overlay.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingOverlayService {
  private _viewContainerRef?: ViewContainerRef;
  private _isShown = false;

  public setViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this._viewContainerRef = viewContainerRef;
  }

  public isShown(): boolean {
    return this._isShown;
  }

  public show(): void {
    this.throwIfViewContainerRefIsUndefined();
    this._viewContainerRef!.createComponent(LoadingOverlayComponent);
    this._isShown = true;
  }

  public hide(): void {
    this.throwIfViewContainerRefIsUndefined();
    this._viewContainerRef!.clear();
    this._isShown = false;
  }

  private throwIfViewContainerRefIsUndefined(): void | never {
    if (this._viewContainerRef === undefined) {
      throw new Error('View container ref must be defined!');
    }
  }
}
