import {
  ChangeDetectorRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
  Input,
} from '@angular/core';

// TODO: Constants/Inputs
const PADDING = 20;
const MARGIN = 22;

@Component({
  selector: 'app-fold',
  templateUrl: './fold.component.html',
  styleUrls: ['./fold.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FoldComponent implements AfterViewInit {
  @Input()
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  @ViewChild('staticPart')
  private readonly _staticPartElementRef!: ElementRef<HTMLElement>;

  @ViewChild('foldablePart')
  private readonly _foldablePartElementRef!: ElementRef<HTMLElement>;

  public get isUnfolded(): boolean {
    return this._isUnfolded;
  }

  protected _disabled = false;
  private _isUnfolded = false;

  constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    private readonly _renderer2: Renderer2,
    private readonly _cdRef: ChangeDetectorRef
  ) {}

  public ngAfterViewInit(): void {
    this.showOnlyStaticPart();
  }

  public fold(): void {
    this._isUnfolded = false;
    this.showOnlyStaticPart();
    this._cdRef.markForCheck();
  }

  public unfold(): void {
    this._isUnfolded = true;
    this.showStaticAndFoldableParts();
    this._cdRef.markForCheck();
  }

  private getStaticPartElement(): HTMLElement {
    return this._staticPartElementRef.nativeElement;
  }

  private getFoldablePartElement(): HTMLElement {
    return this._foldablePartElementRef.nativeElement;
  }

  private showOnlyStaticPart(): void {
    const newHeight =
      PADDING + this.getStaticPartElement().scrollHeight + PADDING;
    this._renderer2.setStyle(
      this._elementRef.nativeElement,
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
    this._renderer2.setStyle(
      this._elementRef.nativeElement,
      'height',
      `${newHeight}px`
    );
  }
}
