import { Disableable } from '@shared/utility-types/disableable.utility-type';
import { PublishedHelpRequestEntity } from '@shared/entities/published-help-request.entity';

export type PublishedHelpRequest = Disableable<PublishedHelpRequestEntity>;
export type ListOfPublishedHelpRequests = ReadonlyArray<PublishedHelpRequest>;
