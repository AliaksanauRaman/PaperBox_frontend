import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';

import { FoldableComponent } from '../../../shared/components/foldable/foldable.component';
import { HoverableDirective } from '../../../shared/directives/hoverable/hoverable.directive';

import { PublishedHelpRequestType } from '../../../shared/types/published-help-request.type';

@Component({
  selector: 'app-help-requests-list-item',
  templateUrl: './help-requests-list-item.component.html',
  styleUrls: ['./help-requests-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpRequestsListItemComponent {
  @Input()
  public set publishedHelpRequest(value: PublishedHelpRequestType) {
    this._publishedHelpRequest = value;
  }

  @ViewChild(FoldableComponent)
  private readonly foldableComponentRef?: FoldableComponent;

  @ViewChild(HoverableDirective)
  private readonly hoverableDirectiveRef?: HoverableDirective;

  public get isUnfolded(): boolean {
    if (this.foldableComponentRef === undefined) {
      return false;
    }

    return this.foldableComponentRef.isUnfolded;
  }

  public get isHovered(): boolean {
    if (this.hoverableDirectiveRef === undefined) {
      return false;
    }

    return this.hoverableDirectiveRef.isHovered;
  }

  public _publishedHelpRequest?: PublishedHelpRequestType;

  public handleCardClick(): void {
    if (this.foldableComponentRef === undefined) {
      throw new Error(`Foldable component ref is not defined!`);
    }

    if (this.hoverableDirectiveRef === undefined) {
      throw new Error(`Hoverable directive ref is not defined!`);
    }

    if (this.isUnfolded) {
      this.foldableComponentRef.fold();
      this.hoverableDirectiveRef.unhover();
    } else {
      this.foldableComponentRef.unfold();
    }
  }
}
