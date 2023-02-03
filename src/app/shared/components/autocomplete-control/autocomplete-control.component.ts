import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { map, BehaviorSubject } from 'rxjs';

import { UniqueIdGeneratorService } from '../../../services/unique-id-generator.service';

import { CustomControl } from '../../abstracts/custom-control.class';
import { DataSourceOption } from '../../classes/data-source-option.class';
import { DataSource } from '../../classes/data-source.class';

@Component({
  selector: 'app-autocomplete-control',
  templateUrl: './autocomplete-control.component.html',
  styleUrls: ['./autocomplete-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteControlComponent extends CustomControl<string> {
  @Input()
  public set label(value: string) {
    this.controlLabel = value;
  }

  @Input()
  public set dataSource(value: DataSource<string>) {
    this._dataSource = value;
  }

  @Input()
  public set required(value: boolean) {
    this.controlRequired = value;
  }

  public get isPanelOpen(): boolean {
    return this._isPanelOpen;
  }

  protected controlValue = '';
  protected readonly inputValue$ = new BehaviorSubject<string>('');
  protected readonly filteredOptions$ = this.inputValue$.asObservable().pipe(
    map((inputValue) => {
      if (inputValue === '' || inputValue === null) {
        return this._dataSource.options;
      }

      return this._dataSource.options.filter((option) => {
        return option.label.toLowerCase().includes(inputValue.toLowerCase());
      });
    })
  );

  @ViewChild('inputRef')
  private readonly inputElementRef!: ElementRef<HTMLInputElement>;

  private isInitialFocus = true;
  private _dataSource = new DataSource<string>([]);
  private _isPanelOpen = false;

  constructor(
    uniqueIdGeneratorService: UniqueIdGeneratorService,
    cdRef: ChangeDetectorRef
  ) {
    super(uniqueIdGeneratorService, cdRef);
  }

  public writeValue(value: unknown): void {
    // TODO
  }

  public handleInputValueChange(value: string): void {
    if (!this.isPanelOpen) {
      this.openPanel();
    }

    const nextControlValue = '';

    if (this.isNewControlValue(nextControlValue)) {
      this.emitControlValueChange(nextControlValue);
      this.updateControlValue(nextControlValue);
    }

    this.updateInputValue(value);
  }

  public handleOptionSelect(option: DataSourceOption<string>): void {
    const nextControlValue = option.value;

    if (this.isNewControlValue(nextControlValue)) {
      this.emitControlValueChange(nextControlValue);
      this.updateControlValue(nextControlValue);
    }

    this.updateInputValue(option.label);
    this.closePanel();
    this.cdRef.markForCheck();
    this.inputElementRef.nativeElement.focus();
  }

  public handleInputClick(): void {
    if (this.isPanelOpen) {
      return;
    }

    this.openPanel();
  }

  public handleInputFocus(): void {
    if (this.isInitialFocus) {
      this.isInitialFocus = false;
      this.openPanel();
    }

    if (!this.controlFocused) {
      this.markControlAsFocused();
    }
  }

  public handleInputBlur(): void {
    this.markControlAsUnfocused();
    this.handleControlBlur();
  }

  public handleOverlayOutsideClick(event: MouseEvent): void {
    if (event.target === this.inputElementRef.nativeElement) {
      event.stopImmediatePropagation();
      return;
    }

    this.closePanel();
  }

  protected openPanel(): void {
    this._isPanelOpen = true;
  }

  protected closePanel(): void {
    this._isPanelOpen = false;
  }

  private updateInputValue(newValue: string): void {
    this.inputValue$.next(newValue);
  }

  private isNewControlValue(nextValue: string): boolean {
    return this.controlValue !== nextValue;
  }

  private emitControlValueChange(nextValue: string): void {
    this.onChange(nextValue);
  }

  private updateControlValue(newValue: string): void {
    this.controlValue = newValue;
  }
}
