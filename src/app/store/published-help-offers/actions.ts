import { ListOfPublishedHelpOffersType } from '@shared/types/list-of-published-help-offers.type';
import { PublishedHelpOfferType } from '@shared/types/published-help-offer.type';

export namespace PublishedHelpOffers {
  export class Get {
    public static type = '[Published Help Offers] Get';
  }

  export class DestroyGet {
    public static type = '[Published Help Offers] Destroy Get';
  }

  export class GetSuccess {
    public static type = '[Published Help Offers] Get Success';
    constructor(
      public readonly listOfPublishedHelpOffers: ListOfPublishedHelpOffersType
    ) {}
  }

  export class GetFail {
    public static type = '[Published Help Offers] Get Fail';
    constructor(public readonly error: unknown) {}
  }

  export class DeleteOne {
    public static type = '[Published Help Offers] Delete One';
    constructor(public readonly helpOfferId: number) {}
  }

  export class DestroyDeleteOne {
    public static type = '[Published Help Offers] Destroy Delete One';
  }

  export class DeleteOneSuccess {
    public static type = '[Published Help Offers] Delete One Success';
    constructor(public readonly deletedHelpOfferId: number) {}
  }

  export class DeleteOneFail {
    public static type = '[Published Help Offers] Delete One Fail';
    constructor(public readonly error: unknown) {}
  }

  export class Prepend {
    public static type = '[Published Help Offers] Prepend';
    constructor(public readonly publishedHelpOffer: PublishedHelpOfferType) {}
  }
}
