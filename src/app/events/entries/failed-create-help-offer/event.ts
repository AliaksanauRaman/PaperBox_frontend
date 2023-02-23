import { AppEventName } from '../../app-event-name.enum';
import { AppEvent } from '../../app-event.interface';
import { FailedCreateHelpOfferPayload } from './payload';

export class FailedCreateHelpOffer
  implements AppEvent<FailedCreateHelpOfferPayload>
{
  public readonly name = AppEventName.FAILED_CREATE_HELP_OFFER;

  constructor(public readonly payload: FailedCreateHelpOfferPayload) {}
}
