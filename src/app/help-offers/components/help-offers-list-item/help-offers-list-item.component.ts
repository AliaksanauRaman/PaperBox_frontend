import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  HostBinding,
  HostListener,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';

// TODO: Constants
const PADDING = 20;
const MARGIN = 22;

@Component({
  selector: 'app-help-offers-list-item',
  templateUrl: './help-offers-list-item.component.html',
  styleUrls: ['./help-offers-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpOffersListItemComponent implements AfterViewInit {
  @HostBinding('class.hovered')
  public get isHovered(): boolean {
    return this._isHovered;
  }

  @HostBinding('class.expanded')
  public get isExpanded(): boolean {
    return this._isExpanded;
  }

  @HostListener('mouseenter')
  public handleHostMouseenter(): void {
    this._isHovered = true;
  }

  @HostListener('mouseleave')
  public handleHostMouseleave(): void {
    this._isHovered = false;
  }

  @HostListener('click')
  public handleHostClick(): void {
    if (this._isExpanded) {
      // TODO: Think
      this.collapse();
      this._isHovered = false;
    } else {
      this.expand();
    }
  }

  @ViewChild('staticPart')
  private readonly staticPartElementRef?: ElementRef<HTMLDivElement>;

  @ViewChild('collapsiblePart')
  private readonly collapsiblePartElementRef?: ElementRef<HTMLDivElement>;

  protected _isHovered = false;
  protected _isExpanded = false;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer2: Renderer2
  ) {}

  public ngAfterViewInit(): void {
    this.collapse();
  }

  public getStaticPartElement(): HTMLDivElement {
    if (!this.staticPartElementRef) {
      throw new Error('Impossible!');
    }

    return this.staticPartElementRef.nativeElement;
  }

  public getCollapsiblePartElement(): HTMLDivElement {
    if (!this.collapsiblePartElementRef) {
      throw new Error('Impossible!');
    }

    return this.collapsiblePartElementRef.nativeElement;
  }

  // TODO: Refactor
  private expand(): void {
    this._isExpanded = true;
    const newHeight =
      PADDING +
      this.getStaticPartElement().scrollHeight +
      MARGIN +
      this.getCollapsiblePartElement().scrollHeight +
      PADDING;
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'height',
      `${newHeight}px`
    );
  }

  private collapse(): void {
    this._isExpanded = false;
    const newHeight =
      PADDING + this.getStaticPartElement().scrollHeight + PADDING;
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'height',
      `${newHeight}px`
    );
  }
}
