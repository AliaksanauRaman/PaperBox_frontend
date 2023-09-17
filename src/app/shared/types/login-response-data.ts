import { z } from 'zod';

const loginResponseDataObject = z.object({
  token: z.string(),
});

export class LoginResponseData {
  public static fromObject(object: unknown): LoginResponseData {
    return new LoginResponseData(loginResponseDataObject.parse(object).token);
  }

  constructor(public readonly token: string) {}
}
