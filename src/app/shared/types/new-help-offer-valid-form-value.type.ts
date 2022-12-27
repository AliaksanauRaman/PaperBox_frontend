import { JSONSchemaType } from "ajv";

import { DateType } from "../enums/date-type.enum";
import { PhoneType } from "./phone.type";

export type NewHelpOfferValidFormValueType = Readonly<{
  authorFullName: string;
  dateType: DateType;
  specificDateAsString: string;
  dateFromAsString: string;
  dateToAsString: string;
  countryFrom: string;
  cityFrom: string;
  countryTo: string;
  cityTo: string;
  phones: Array<PhoneType>;
  comment: string;
}>;

export const newHelpOfferValidFormValueSchema: JSONSchemaType<NewHelpOfferValidFormValueType> = {
  type: 'object',
  properties: {
    authorFullName: { type: 'string' },
    dateType: {
      type: 'string',
      enum: [DateType.SPECIFIC, DateType.RANGE],
    },
    specificDateAsString: { type: 'string' },
    dateFromAsString: { type: 'string' },
    dateToAsString: { type: 'string' },
    countryFrom: { type: 'string' },
    cityFrom: { type: 'string' },
    countryTo: { type: 'string' },
    cityTo: { type: 'string' },
    phones: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          diallingCode: { type: 'string' },
          number: { type: 'string' },
        },
        required: ['diallingCode', 'number'],
        additionalProperties: false,
      },
    },
    comment: { type: 'string' },
  },
  required: [
    'authorFullName',
    'dateType',
    'specificDateAsString',
    'dateFromAsString',
    'dateToAsString',
    'countryFrom',
    'cityFrom',
    'countryTo',
    'cityTo',
    'phones',
    'comment',
  ],
  additionalProperties: false,
};
