export type PhoneType = Readonly<{
  diallingCode: string;
  number: string;
}>;
export type PhoneListType = ReadonlyArray<PhoneType>;
