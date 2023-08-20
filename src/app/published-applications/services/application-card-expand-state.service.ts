import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, takeUntil } from 'rxjs';

import { DestroyEmitter } from '@shared/abstracts/destroy-emitter.class';
import { FoldComponent } from '@shared/components/fold/fold.component';

@Injectable()
export class ApplicationCardExpandStateService extends DestroyEmitter {
  private readonly _isExpanded$ = new BehaviorSubject<boolean>(false);

  public readonly isExpanded$ = this._isExpanded$.asObservable();

  public init(foldComponent: FoldComponent): void {
    foldComponent.isUnfolded$
      .pipe(
        tap((isUnfolded) => this._isExpanded$.next(isUnfolded)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
