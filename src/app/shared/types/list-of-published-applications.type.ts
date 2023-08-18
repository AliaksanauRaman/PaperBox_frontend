import { ListOfPublishedHelpOffersType } from './list-of-published-help-offers.type';
import { ListOfPublishedHelpRequestsType } from './list-of-published-help-requests.type';

export type ListOfPublishedApplications =
  | ListOfPublishedHelpOffersType
  | ListOfPublishedHelpRequestsType;
