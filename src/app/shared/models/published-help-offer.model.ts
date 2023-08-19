import { Disableable } from '@shared/utility-types/disableable.utility-type';
import { PublishedHelpOfferEntity } from '@shared/entities/published-help-offer.entity';

export type PublishedHelpOffer = Disableable<PublishedHelpOfferEntity>;
export type ListOfPublishedHelpOffers = ReadonlyArray<PublishedHelpOffer>;
