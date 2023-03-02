import { LocationsControlValueType } from './locations-control-value.type';
import {
  DateControlValueType,
  ValidDateControlValueType,
} from './date-control-value.type';
import { PhoneListType } from './phone-list.type';

import { RequiredAndNonNullable } from './required-and-non-nullable.utility-type';

export type CreateHelpRequestFormValueType = Partial<
  Readonly<{
    locations: LocationsControlValueType | null;
    date: DateControlValueType | null;
    comment: string | null;
    fullName: string | null;
    phones: PhoneListType | null;
  }>
>;

export type ValidCreateHelpRequestFormValueType = Omit<
  RequiredAndNonNullable<CreateHelpRequestFormValueType>,
  'date'
> & {
  readonly date: ValidDateControlValueType;
};
