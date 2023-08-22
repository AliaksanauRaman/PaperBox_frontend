import { Disableable } from '@shared/utility-types/disableable.utility-type';
import { PublishedApplicationEntity } from '@shared/entities/published-application.entity';

export type PublishedHelpOffer = Disableable<PublishedApplicationEntity>;
export type ListOfPublishedHelpOffers = ReadonlyArray<PublishedHelpOffer>;
