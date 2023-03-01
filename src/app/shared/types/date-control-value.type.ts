export type DateControlValueType = Readonly<{
  start: Date | null;
  end: Date | null;
}>;

export type ValidDateControlValueType = Readonly<{
  start: Date;
  end: Date | null;
}>;
