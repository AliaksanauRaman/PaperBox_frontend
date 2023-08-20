import {
  ListOfPublishedHelpOffers,
  PublishedHelpOffer,
} from '@shared/models/published-help-offer.model';

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
      public readonly listOfPublishedHelpOffers: ListOfPublishedHelpOffers
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

  export class PrependOne {
    public static type = '[Published Help Offers] Prepend One';
    constructor(public readonly publishedHelpOffer: PublishedHelpOffer) {}
  }

  export class DisableOne {
    public static type = '[Published Help Offers] Disable One';
    constructor(public readonly helpOfferIdToDisable: number) {}
  }

  export class EnableOne {
    public static type = '[Published Help Offers] Enable One';
    constructor(public readonly helpOfferIdToEnable: number) {}
  }
}
