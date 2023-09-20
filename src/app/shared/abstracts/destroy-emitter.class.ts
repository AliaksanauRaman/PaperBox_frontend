import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * @deprecated Use {AutoDestroy} instead
 */
@Injectable()
export abstract class DestroyEmitter implements OnDestroy {
  protected readonly destroy$ = new Subject<void>();

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
