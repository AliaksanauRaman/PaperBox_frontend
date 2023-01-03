import { AppEventName } from '../../app-event-name.enum';
import { AppEvent } from '../../app-event.interface';
import { FailedDeleteHelpOfferPayload } from './payload';

export class FailedDeleteHelpOffer
  implements AppEvent<FailedDeleteHelpOfferPayload>
{
  public readonly name = AppEventName.FAILED_DELETE_HELP_OFFER;

  constructor(public readonly payload: FailedDeleteHelpOfferPayload) {}
}
