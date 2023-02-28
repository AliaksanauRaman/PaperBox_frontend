import { RequiredAndNonNullable } from './required-and-non-nullable.utility-type';

export type CreateFeedbackFormValueType = Partial<
  Readonly<{
    fullName: string | null;
    email: string | null;
    comment: string | null;
  }>
>;

export type ValidCreateFeedbackFormValueType =
  RequiredAndNonNullable<CreateFeedbackFormValueType>;
