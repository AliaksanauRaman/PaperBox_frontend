import { AppEventName } from '../../app-event-name.enum';
import { AppEvent } from '../../app-event.interface';
import { SuccessCreateHelpOfferPayload } from './payload';

export class SuccessCreateHelpOffer
  implements AppEvent<SuccessCreateHelpOfferPayload>
{
  public readonly name = AppEventName.SUCCESS_CREATE_HELP_OFFER;

  constructor(public readonly payload: SuccessCreateHelpOfferPayload) {}
}
