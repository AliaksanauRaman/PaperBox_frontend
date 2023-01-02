import { HelpOfferStatus } from '../../shared/enums/help-offer-status.enum';

export type UpdateHelpOfferStatusResponseType = Readonly<{
  id: string;
  newStatus: HelpOfferStatus;
}>;
