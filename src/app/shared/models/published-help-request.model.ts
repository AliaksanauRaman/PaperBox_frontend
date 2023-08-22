import { Disableable } from '@shared/utility-types/disableable.utility-type';
import { PublishedApplicationEntity } from '@shared/entities/published-application.entity';

export type PublishedHelpRequest = Disableable<PublishedApplicationEntity>;
export type ListOfPublishedHelpRequests = ReadonlyArray<PublishedHelpRequest>;
