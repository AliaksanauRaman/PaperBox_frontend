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
} from './entries';

export type AppEventUnion =
  | MakeGetFullPreviewsOfAllHelpOffersRequest
  | SuccessGetFullPreviewsOfAllHelpOffers
  | FailedGetFullPreviewsOfAllHelpOffers
  | MakeGetOneFullHelpOfferRequest
  | SuccessGetOneFullHelpOffer
  | FailedGetOneFullHelpOffer
  | MakeHelpOfferStatusUpdateRequest
  | SuccessHelpOfferStatusUpdate
  | FailedHelpOfferStatusUpdate;
