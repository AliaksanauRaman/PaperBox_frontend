import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  ViewChild,
  Input,
} from '@angular/core';

import { FoldableComponent } from '../../../shared/components/foldable/foldable.component';

import { PublishedHelpOfferType } from './../../../shared/types/published-help-offer.type';

@Component({
  selector: 'app-help-offers-list-item',
  templateUrl: './help-offers-list-item.component.html',
  styleUrls: ['./help-offers-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpOffersListItemComponent {
  @Input()
  public set publishedHelpOffer(value: PublishedHelpOfferType) {
    this._publishedHelpOffer = value;
  }

  @HostBinding('class.hovered')
  public get isHovered(): boolean {
    return this._isHovered;
  }

  @HostBinding('class.expanded')
  public get isExpanded(): boolean {
    if (this.foldableComponentRef === undefined) {
      return false;
    }

    return this.foldableComponentRef.isUnfolded;
  }

  @HostListener('mouseenter')
  public handleHostMouseenter(): void {
    this._isHovered = true;
  }

  @HostListener('mouseover')
  public handleHostMouseover(): void {
    if (!this._isHovered) {
      this._isHovered = true;
    }
  }

  @HostListener('mouseleave')
  public handleHostMouseleave(): void {
    this._isHovered = false;
  }

  @HostListener('click')
  public handleHostClick(): void {
    if (this.foldableComponentRef === undefined) {
      throw new Error(`Foldable component ref is not defined!`);
    }

    if (this.foldableComponentRef.isUnfolded) {
      this.foldableComponentRef.fold();
      this._isHovered = false;
    } else {
      this.foldableComponentRef.unfold();
    }
  }

  @ViewChild(FoldableComponent)
  private readonly foldableComponentRef?: FoldableComponent;

  public get isUnfolded(): boolean {
    if (this.foldableComponentRef === undefined) {
      return false;
    }

    return this.foldableComponentRef.isUnfolded;
  }

  public _publishedHelpOffer?: PublishedHelpOfferType;
  private _isHovered = false;
}
