import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, takeUntil } from 'rxjs';

import { DestroyEmitter } from '@shared/abstracts/destroy-emitter.class';
import { HoverDirective } from '@shared/directives/hover.directive';

@Injectable()
export class ApplicationCardHoverStateService extends DestroyEmitter {
  private readonly _isHovered$ = new BehaviorSubject<boolean>(false);

  public readonly isHovered$ = this._isHovered$.asObservable();

  public init(hoverDirective: HoverDirective): void {
    hoverDirective.isHovered$
      .pipe(
        tap((isHovered) => this._isHovered$.next(isHovered)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
