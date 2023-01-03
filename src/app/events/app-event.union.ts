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
