import { HelpOfferStatus } from '../../../shared/enums/help-offer-status.enum';

export type MakeHelpOfferStatusUpdateRequestPayload = Readonly<{
  id: string;
  newStatus: HelpOfferStatus;
}>;
