import {
  MakeGetPublishedHelpOffersRequest,
  SuccessGetPublishedHelpOffers,
  FailedGetPublishedHelpOffers,
} from '../help-offers/events';

import {
  MakeGetPublishedHelpRequestsRequest,
  SuccessGetPublishedHelpRequests,
  FailedGetPublishedHelpRequests,
} from '../help-requests/events';

import {
  MakeGetFullPreviewsOfAllHelpOffersRequest,
  SuccessGetFullPreviewsOfAllHelpOffers,
  FailedGetFullPreviewsOfAllHelpOffers,
  MakeGetOneFullHelpOfferRequest,
  SuccessGetOneFullHelpOffer,
  FailedGetOneFullHelpOffer,
  MakeHelpOfferStatusUpdateRequest,
  SuccessHelpOfferStatusUpdate,
  FailedHelpOfferStatusUpdate,
  MakeDeleteHelpOfferRequest,
  SuccessDeleteHelpOffer,
  FailedDeleteHelpOffer,
} from './entries';

export type AppEventUnion =
  | MakeGetPublishedHelpOffersRequest
  | SuccessGetPublishedHelpOffers
  | FailedGetPublishedHelpOffers
  | MakeGetPublishedHelpRequestsRequest
  | SuccessGetPublishedHelpRequests
  | FailedGetPublishedHelpRequests
  | MakeGetFullPreviewsOfAllHelpOffersRequest
  | SuccessGetFullPreviewsOfAllHelpOffers
  | FailedGetFullPreviewsOfAllHelpOffers
  | MakeGetOneFullHelpOfferRequest
  | SuccessGetOneFullHelpOffer
  | FailedGetOneFullHelpOffer
  | MakeHelpOfferStatusUpdateRequest
  | SuccessHelpOfferStatusUpdate
  | FailedHelpOfferStatusUpdate
  | MakeDeleteHelpOfferRequest
  | SuccessDeleteHelpOffer
  | FailedDeleteHelpOffer;
