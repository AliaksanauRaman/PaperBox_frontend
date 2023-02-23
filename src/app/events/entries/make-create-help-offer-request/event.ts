import { AppEventName } from '../../app-event-name.enum';
import { AppEvent } from '../../app-event.interface';
import { MakeCreateHelpOfferRequestPayloadType } from './payload';

export class MakeCreateHelpOfferRequest
  implements AppEvent<MakeCreateHelpOfferRequestPayloadType>
{
  public readonly name = AppEventName.MAKE_CREATE_HELP_OFFER_REQUEST;

  constructor(public readonly payload: MakeCreateHelpOfferRequestPayloadType) {}
}
