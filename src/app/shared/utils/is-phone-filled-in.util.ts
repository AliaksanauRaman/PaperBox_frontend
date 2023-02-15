import { PhoneType } from '../types/phone.type';

export const isPhoneFilledIn = ({
  diallingCode,
  number,
}: PhoneType): boolean => {
  const trimmedDiallingCode = diallingCode.trim();
  const trimmedNumber = number.trim();

  return trimmedDiallingCode !== '' && trimmedNumber !== '';
};
