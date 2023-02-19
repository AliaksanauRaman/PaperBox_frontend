import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  OnInit,
  Input,
} from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { map, startWith, takeUntil, tap } from 'rxjs';

import { UniqueIdGeneratorService } from '../../../services/unique-id-generator.service';

import { CustomControl } from '../../../shared/abstracts/custom-control.class';
import { PhoneType } from '../../../shared/types/phone.type';
import { isPhoneFilledIn } from '../../../shared/utils/is-phone-filled-in.util';

const MAX_PHONES_AMOUNT = 3;
const EMPTY_PHONE: PhoneType = {
  diallingCode: '',
  number: '',
};

@Component({
  selector: 'app-dynamic-phone-list-control',
  templateUrl: './dynamic-phone-list-control.component.html',
  styleUrls: ['./dynamic-phone-list-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicPhoneListControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPhoneListControlComponent
  extends CustomControl<ReadonlyArray<PhoneType>>
  implements OnInit
{
  @Input()
  public set required(value: boolean) {
    this.controlRequired = value;
  }

  protected readonly maxPhonesAmount = MAX_PHONES_AMOUNT;
  protected readonly phoneControlsFormArray = this.formBuilder.array([
    this.createPhoneControl(),
  ]);
  protected readonly nonePhoneIsFilledIn$ =
    this.phoneControlsFormArray.valueChanges.pipe(
      startWith([EMPTY_PHONE]),
      map((phones) => phones.every((phone) => !isPhoneFilledIn(phone)))
    );

  constructor(
    uniqueIdGeneratorService: UniqueIdGeneratorService,
    cdRef: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder
  ) {
    super(uniqueIdGeneratorService, cdRef);
  }

  public atLeastOnePhoneIsTouched(
    phones: ReadonlyArray<FormControl<PhoneType>>
  ): boolean {
    return phones.some((phone) => phone.touched);
  }

  public ngOnInit(): void {
    this.phoneControlsFormArray.valueChanges
      .pipe(
        tap((value) => this.onChange(value)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public writeValue(value: ReadonlyArray<PhoneType>): void {
    // TODO: Assert value type

    this.phoneControlsFormArray.clear();

    for (const phone of value) {
      this.phoneControlsFormArray.push(this.createPhoneControl(phone));
    }
  }

  public appendEmptyPhoneControl(): void {
    const newPhoneControl = this.createPhoneControl();
    newPhoneControl.markAsTouched();
    this.phoneControlsFormArray.push(newPhoneControl);
  }

  public removePhoneControlByIndex(controlIndex: number): void {
    this.phoneControlsFormArray.removeAt(controlIndex);
  }

  private createPhoneControl(
    controlValue = EMPTY_PHONE
  ): FormControl<PhoneType> {
    // TODO: as
    return this.formBuilder.control(controlValue) as FormControl<PhoneType>;
  }
}
