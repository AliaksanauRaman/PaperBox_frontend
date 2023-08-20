import { Injectable, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import { ApplicationCardExpandStateService } from './application-card-expand-state.service';
import { ApplicationCardHoverStateService } from './application-card-hover-state.service';

import { DestroyEmitter } from '@shared/abstracts/destroy-emitter.class';

@Injectable()
export class ApplicationCardActiveStateService extends DestroyEmitter {
  private readonly _expandStateService = inject(
    ApplicationCardExpandStateService
  );
  private readonly _hoverStateService = inject(
    ApplicationCardHoverStateService
  );

  public readonly isActive$ = combineLatest([
    this._expandStateService.isExpanded$,
    this._hoverStateService.isHovered$,
  ]).pipe(map(([isExpanded, isHovered]) => isExpanded || isHovered));
}
