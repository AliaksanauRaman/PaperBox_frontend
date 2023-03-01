import { PhoneType } from '../types/phone.type';
import { isPhoneFilledIn } from './is-phone-filled-in.util';
import { phoneNumberRegExp } from '../regexps/phone-number.regexp';

export const isPhoneValid = (phone: PhoneType): boolean => {
  return isPhoneFilledIn(phone) && phoneNumberRegExp.test(phone.number);
};
