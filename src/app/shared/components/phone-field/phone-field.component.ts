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
  extends BaseReactiveField<Phone>
  implements OnInit
{
  private readonly _formBuilder = inject(NonNullableFormBuilder);

  protected readonly _phoneForm = this._formBuilder.group({
    diallingCode: [DiallingCode.nullish()],
    number: [''],
  });

  public ngOnInit(): void {
    this._phoneForm.valueChanges
      .pipe(
        map(
          (rawValue) =>
            new PhoneFormValue(rawValue.diallingCode, rawValue.number)
        ),
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
    if (Phone.is(value)) {
      this._value.set(value);
      this._phoneForm.setValue(value.toMap(), {
        emitEvent: false,
      });
      return;
    }

    throw new Error('Only Phone value is expected!');
  }

  protected override getDefaultValue(): Phone {
    return Phone.nullish();
  }

  private checkIsNewValue(value: Phone): boolean {
    return !Phone.equals(value, this._value());
  }
}
