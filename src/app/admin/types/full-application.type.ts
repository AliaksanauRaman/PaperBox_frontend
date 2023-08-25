import { z } from 'zod';

import { listOfPhoneEntities } from '@shared/entities/phone.entity';
import { FullApplicationStatus } from '../enums/full-application-status.enum';

export const fullApplicationType = z
  .object({
    id: z.number(),
    userId: z.number(),
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
    status: z.enum([
      FullApplicationStatus.PUBLISHED,
      FullApplicationStatus.UNPUBLISHED,
      FullApplicationStatus.REJECTED,
      FullApplicationStatus.DELETED,
    ]),
  })
  .strict()
  .readonly();
export const listOfFullApplicationsType = z
  .array(fullApplicationType)
  .readonly();

export type FullApplicationType = z.infer<typeof fullApplicationType>;
export type FullApplicationListType = z.infer<
  typeof listOfFullApplicationsType
>;
