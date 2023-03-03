import { PhoneType } from '../types/phone.type';

export class LoginDto {
  constructor(
    public readonly phone: PhoneType,
    public readonly password: string
  ) {}
}
