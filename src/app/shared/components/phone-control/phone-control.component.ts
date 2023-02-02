import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { map, tap, takeUntil } from 'rxjs';

import { UniqueIdGeneratorService } from '../../../services/unique-id-generator.service';
import {
  PHONE_DIALLING_CODES,
  PhoneDiallingCodesType,
} from './../../../core/dependencies/phone-dialling-codes';

import { CustomControl } from '../../abstracts/custom-control.class';
import { DataSource } from '../../classes/data-source.class';
import { PhoneType } from '../../types/phone.type';

@Component({
  selector: 'app-phone-control',
  templateUrl: './phone-control.component.html',
  styleUrls: ['./phone-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneControlComponent
  extends CustomControl<PhoneType>
  implements OnInit
{
  @Input()
  public set label(value: string) {
    this.controlLabel = value;
  }

  @Input()
  public set showPlus(value: boolean) {
    this._showPlus = value;
  }

  @Input()
  public set showMinus(value: boolean) {
    this._showMinus = value;
  }

  public get showPlus(): boolean {
    return this._showPlus;
  }

  public get showMinus(): boolean {
    return this._showMinus;
  }

  @Output()
  public readonly plusClick = new EventEmitter<void>();

  @Output()
  public readonly minusClick = new EventEmitter<void>();

  protected readonly phoneDiallingCodesDataSource =
    DataSource.createFromPhoneDiallingCodes(this.phoneDiallingCodes);
  protected readonly phoneForm = this.formBuilder.group({
    diallingCode: [''],
    number: [''],
  });
  protected readonly controlValue$ = this.phoneForm.valueChanges.pipe(
    map(({ diallingCode, number }) => ({
      diallingCode: diallingCode || '',
      number: number || '',
    }))
  );

  protected isFocused = false;

  private _showPlus = false;
  private _showMinus = false;

  constructor(
    uniqueIdGeneratorService: UniqueIdGeneratorService,
    cdRef: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder,
    @Inject(PHONE_DIALLING_CODES)
    private readonly phoneDiallingCodes: PhoneDiallingCodesType
  ) {
    super(uniqueIdGeneratorService, cdRef);
  }

  public ngOnInit(): void {
    this.controlValue$
      .pipe(
        tap((value) => this.onChange(value)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public writeValue(value: PhoneType): void {
    // TODO: Assert value type

    this.phoneForm.setValue(value);
  }

  public handleDropdownOptionClick(inputRef: HTMLInputElement): void {
    inputRef.focus();
  }

  public handleDropdownFocus(): void {
    this.markControlAsFocused();
  }

  public handleDropdownBlur(): void {
    this.handleControlBlur();
    this.markControlAsUnfocused();
  }

  public handleInputFocus(): void {
    this.markControlAsFocused();
  }

  public handleInputBlur(): void {
    this.handleControlBlur();
    this.markControlAsUnfocused();
  }

  public handlePlusClick(): void {
    this.plusClick.emit();
  }

  public handleMinusClick(): void {
    this.minusClick.emit();
  }

  private markControlAsFocused(): void {
    this.isFocused = true;
  }

  private markControlAsUnfocused(): void {
    this.isFocused = false;
  }
}
