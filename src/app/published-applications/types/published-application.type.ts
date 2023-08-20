import {
  PublishedHelpOffer,
  ListOfPublishedHelpOffers,
} from '@shared/models/published-help-offer.model';
import {
  PublishedHelpRequest,
  ListOfPublishedHelpRequests,
} from '@shared/models/published-help-request.model';

export type PublishedApplicationType =
  | PublishedHelpOffer
  | PublishedHelpRequest;
export type ListOfPublishedApplicationsType =
  | ListOfPublishedHelpOffers
  | ListOfPublishedHelpRequests;
