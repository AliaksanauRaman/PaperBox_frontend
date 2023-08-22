import { z } from 'zod';

import { listOfPhoneEntities } from './phone.entity';

export const publishedApplicationEntity = z
  .object({
    id: z.number(),
    userId: z.number(),
    publicId: z.string(),
    locationFrom: z.string(),
    locationTo: z.string(),
    comment: z.string(),
    fullName: z.string(),
    phones: listOfPhoneEntities,
    startDate: z.string().transform((value) => new Date(value)),
    endDate: z
      .string()
      .nullable()
      .transform((value) => (value === null ? null : new Date(value))),
  })
  .strict()
  .readonly();
export const listOfPublishedApplicationEntities = z
  .array(publishedApplicationEntity)
  .readonly();

export type PublishedHelpOfferEntity = z.infer<
  typeof publishedApplicationEntity
>;
export type ListOfPublishedHelpOfferEntities = z.infer<
  typeof listOfPublishedApplicationEntities
>;
