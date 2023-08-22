import { z } from 'zod';

export const phoneEntity = z
  .object({
    diallingCode: z.string(),
    number: z.string(),
  })
  .strict()
  .readonly();
export const listOfPhoneEntities = z.array(phoneEntity).max(3).readonly();

export type PhoneEntity = z.infer<typeof phoneEntity>;
export type ListOfPhoneEntities = z.infer<typeof listOfPhoneEntities>;
