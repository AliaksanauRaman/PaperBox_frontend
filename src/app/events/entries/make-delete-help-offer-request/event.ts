import { AppEventName } from '../../app-event-name.enum';
import { AppEvent } from '../../app-event.interface';
import { MakeDeleteHelpOfferRequestPayload } from './payload';

export class MakeDeleteHelpOfferRequest
  implements AppEvent<MakeDeleteHelpOfferRequestPayload>
{
  public readonly name = AppEventName.MAKE_DELETE_HELP_OFFER_REQUEST;

  constructor(public readonly payload: MakeDeleteHelpOfferRequestPayload) {}
}
