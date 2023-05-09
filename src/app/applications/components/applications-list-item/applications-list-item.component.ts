import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { FoldComponent } from '../../../shared/components/fold/fold.component';
import { HoverDirective } from '../../../shared/directives/hover.directive';

import { AppLocaleService } from '../../../core/services/app-locale.service';

import { PublishedApplicationType } from '../../types/published-application.type';

@Component({
  selector: 'app-applications-list-item',
  templateUrl: './applications-list-item.component.html',
  styleUrls: ['./applications-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsListItemComponent {
  @Input()
  public set publishedApplication(value: PublishedApplicationType) {
    this._publishedApplication = value;
  }

  @Input()
  public set showActions(value: boolean) {
    this._showActions = value;
  }

  @Input()
  public set actionsDisabled(value: boolean) {
    this._actionsDisabled = value;
  }

  @Input()
  public set deletionInProgress(value: boolean) {
    this._deletionInProgress = value;
  }

  @Output()
  public readonly deleteClick = new EventEmitter<void>();

  @ViewChild(FoldComponent)
  private readonly _foldRef?: FoldComponent;

  @ViewChild(HoverDirective)
  private readonly _hover?: HoverDirective;

  public get isUnfolded(): boolean {
    if (this._foldRef === undefined) {
      return false;
    }

    return this._foldRef.isUnfolded;
  }

  public get isHovered(): boolean {
    if (this._hover === undefined) {
      return false;
    }

    return this._hover.isHovered;
  }

  protected _publishedApplication?: PublishedApplicationType;
  protected _showActions = false;
  protected _actionsDisabled = false;
  protected _deletionInProgress = false;

  constructor(protected readonly _localeService: AppLocaleService) {}

  protected handleCardClick(): void {
    if (this._foldRef === undefined) {
      throw new Error(`Foldable component ref is not defined!`);
    }

    if (this._hover === undefined) {
      throw new Error(`Hover directive ref is not defined!`);
    }

    if (this.isUnfolded) {
      this._foldRef.fold();
      this._hover.unhover();
    } else {
      this._foldRef.unfold();
    }
  }

  protected handleDeleteButtonClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.deleteClick.emit();
  }
}
