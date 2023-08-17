import { PublishedHelpOfferType } from './published-help-offer.type';
import { PublishedHelpRequestType } from './published-help-request.type';

export type PublishedApplicationType =
  | PublishedHelpOfferType
  | PublishedHelpRequestType;
