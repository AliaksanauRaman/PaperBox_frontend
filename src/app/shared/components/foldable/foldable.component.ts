import {
  ChangeDetectorRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';

// TODO: Constants/Inputs
const PADDING = 20;
const MARGIN = 22;

@Component({
  selector: 'app-foldable',
  templateUrl: './foldable.component.html',
  styleUrls: ['./foldable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldableComponent implements AfterViewInit {
  @ViewChild('staticPart')
  private readonly staticPartElementRef!: ElementRef<HTMLElement>;

  @ViewChild('foldablePart')
  private readonly foldablePartElementRef!: ElementRef<HTMLElement>;

  public get isUnfolded(): boolean {
    return this._isUnfolded;
  }

  private _isUnfolded = false;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer2: Renderer2,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  public ngAfterViewInit(): void {
    this.showOnlyStaticPart();
  }

  public fold(): void {
    this._isUnfolded = false;
    this.showOnlyStaticPart();
    this.cdRef.markForCheck();
  }

  public unfold(): void {
    this._isUnfolded = true;
    this.showStaticAndFoldableParts();
    this.cdRef.markForCheck();
  }

  private getStaticPartElement(): HTMLElement {
    return this.staticPartElementRef.nativeElement;
  }

  private getFoldablePartElement(): HTMLElement {
    return this.foldablePartElementRef.nativeElement;
  }

  private showOnlyStaticPart(): void {
    const newHeight =
      PADDING + this.getStaticPartElement().scrollHeight + PADDING;
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'height',
      `${newHeight}px`
    );
  }

  private showStaticAndFoldableParts(): void {
    const newHeight =
      PADDING +
      this.getStaticPartElement().scrollHeight +
      MARGIN +
      this.getFoldablePartElement().scrollHeight +
      PADDING;
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'height',
      `${newHeight}px`
    );
  }
}
