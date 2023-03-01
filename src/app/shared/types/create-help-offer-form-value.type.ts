import { LocationsControlValueType } from './locations-control-value.type';
import {
  DateControlValueType,
  ValidDateControlValueType,
} from './date-control-value.type';
import { PhoneType } from './phone.type';

import { RequiredAndNonNullable } from './required-and-non-nullable.utility-type';

export type CreateHelpOfferFormValueType = Partial<
  Readonly<{
    locations: LocationsControlValueType | null;
    date: DateControlValueType | null;
    comment: string | null;
    fullName: string | null;
    phones: ReadonlyArray<PhoneType> | null;
  }>
>;

export type ValidCreateHelpOfferFormValueType = Omit<
  RequiredAndNonNullable<CreateHelpOfferFormValueType>,
  'date'
> & {
  readonly date: ValidDateControlValueType;
};
