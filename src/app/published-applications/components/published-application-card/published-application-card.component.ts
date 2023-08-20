import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

import { FoldComponent } from '@shared/components/fold/fold.component';
import { HoverDirective } from '@shared/directives/hover.directive';
import { PublishedApplicationCardStaticPartComponent } from '../published-application-card-static-part/published-application-card-static-part.component';
import { PublishedApplicationCardFoldablePartComponent } from '../published-application-card-foldable-part/published-application-card-foldable-part.component';

import { ApplicationCardExpandStateService } from '../../services/application-card-expand-state.service';
import { ApplicationCardHoverStateService } from '../../services/application-card-hover-state.service';
import { ApplicationCardActiveStateService } from '../../services/application-card-active-state.service';
import { ApplicationCardAuthorStateService } from '../../services/application-card-author-state.service';

import { PublishedApplicationType } from '../../types/published-application.type';

@Component({
  selector: 'app-published-application-card',
  templateUrl: './published-application-card.component.html',
  styleUrls: ['./published-application-card.component.scss'],
  providers: [
    ApplicationCardExpandStateService,
    ApplicationCardHoverStateService,
    ApplicationCardActiveStateService,
    ApplicationCardAuthorStateService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MatRippleModule,
    FoldComponent,
    HoverDirective,
    PublishedApplicationCardStaticPartComponent,
    PublishedApplicationCardFoldablePartComponent,
  ],
})
export class PublishedApplicationCardComponent implements AfterViewInit {
  @Input()
  public set publishedApplication(value: PublishedApplicationType) {
    this._publishedApplication = value;
  }

  @ViewChild(FoldComponent)
  private readonly _foldComponent?: FoldComponent;

  @ViewChild(HoverDirective)
  private readonly _hoverDirective?: HoverDirective;

  protected _publishedApplication?: PublishedApplicationType;

  protected readonly _expandStateService = inject(
    ApplicationCardExpandStateService
  );
  protected readonly _hoverStateService = inject(
    ApplicationCardHoverStateService
  );
  protected readonly _activeStateService = inject(
    ApplicationCardActiveStateService
  );
  protected readonly _authorStateService = inject(
    ApplicationCardAuthorStateService
  );

  public ngAfterViewInit(): void {
    this.throwIfFoldComponentIsUndefined();
    this.throwIfHoverDirectiveIsUndefined();
    this.throwIfPublishedApplicationIsUndefined();

    this._expandStateService.init(this._foldComponent!);
    this._hoverStateService.init(this._hoverDirective!);
    this._authorStateService.init(this._publishedApplication!);
  }

  protected handleCardClick(): void {
    this.throwIfFoldComponentIsUndefined();
    this.throwIfHoverDirectiveIsUndefined();

    if (this._foldComponent!.isUnfolded) {
      this._foldComponent!.fold();
      this._hoverDirective!.unhover();
      return;
    }

    this._foldComponent!.unfold();
  }

  private throwIfFoldComponentIsUndefined(): void | never {
    if (this._foldComponent === undefined) {
      throw new Error('Fold component is undefined!');
    }
  }

  private throwIfHoverDirectiveIsUndefined(): void | never {
    if (this._hoverDirective === undefined) {
      throw new Error('Hover directive is undefined!');
    }
  }

  private throwIfPublishedApplicationIsUndefined(): void | never {
    if (this._publishedApplication === undefined) {
      throw new Error('Published application is undefined!');
    }
  }
}
