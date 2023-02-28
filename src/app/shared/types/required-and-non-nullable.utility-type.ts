export type RequiredAndNonNullable<T> = Required<{
  [P in keyof T]: NonNullable<T[P]>;
}>;
