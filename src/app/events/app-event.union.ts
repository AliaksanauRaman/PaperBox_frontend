import {
  MakeGetPublishedHelpOffersRequest,
  SuccessGetPublishedHelpOffers,
  FailedGetPublishedHelpOffers,
} from './../help-offers/events';

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
