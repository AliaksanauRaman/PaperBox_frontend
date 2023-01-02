import { HelpOfferStatus } from '../../../shared/enums/help-offer-status.enum';

export type SuccessHelpOfferStatusUpdatePayload = Readonly<{
  id: string;
  newStatus: HelpOfferStatus;
}>;
