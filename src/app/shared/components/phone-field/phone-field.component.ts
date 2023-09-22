import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnInit,
  inject,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { map, filter, takeUntil, tap } from 'rxjs';

import { DiallingCodeDropdownFieldComponent } from '../dialling-code-dropdown-field/dialling-code-dropdown-field.component';

import { BaseReactiveField } from '@shared/base/base-reactive-field.directive';
import { Phone } from '@shared/types/phone';
import { DiallingCode } from '@shared/types/dialling-code';
import { PhoneFormValue } from '@shared/types/phone-form-value';

@Component({
  selector: 'pu-phone-field',
  templateUrl: './phone-field.component.html',
  styleUrls: ['./phone-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneFieldComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, DiallingCodeDropdownFieldComponent],
})
export class PhoneFieldComponent
  extends BaseReactiveField<Phone | null>
  implements OnInit
{
  private readonly _formBuilder = inject(NonNullableFormBuilder);

  protected readonly _phoneForm = this._formBuilder.group({
    diallingCode: [null as DiallingCode | null],
    number: [''],
  });

  public ngOnInit(): void {
    this._phoneForm.valueChanges
      .pipe(
        map((rawFormValue) => new PhoneFormValue(rawFormValue)),
        map((formValue) => formValue.toPhone()),
        filter((phone) => this.checkIsNewValue(phone)),
        tap((phone) => {
          this._value.set(phone);
          this.onChange(phone);
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  public override writeValue(value: unknown): void {
    if (value !== null && !Phone.is(value)) {
      throw new Error('A null or Phone value is expected!');
    }

    if (value === null) {
      this.writeNull(value);
      return;
    }

    this.writePhone(value);
  }

  protected override getDefaultValue(): Phone | null {
    return null;
  }

  private writeNull(value: null): void {
    this._value.set(value);
    this._phoneForm.setValue(PhoneFormValue.empty().toMap(), {
      emitEvent: false,
    });
  }

  private writePhone(value: Phone): void {
    this._value.set(value);
    this._phoneForm.setValue(value.toMap(), {
      emitEvent: false,
    });
  }

  private checkIsNewValue(value: Phone): boolean {
    const currentValue = this._value();
    return currentValue === null || !currentValue.equalsTo(value);
  }
}
