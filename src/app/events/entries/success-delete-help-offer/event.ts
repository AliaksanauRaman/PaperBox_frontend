import { AppEventName } from '../../app-event-name.enum';
import { AppEvent } from '../../app-event.interface';
import { SuccessDeleteHelpOfferPayload } from './payload';

export class SuccessDeleteHelpOffer
  implements AppEvent<SuccessDeleteHelpOfferPayload>
{
  public readonly name = AppEventName.SUCCESS_DELETE_HELP_OFFER;

  constructor(public readonly payload: SuccessDeleteHelpOfferPayload) {}
}
