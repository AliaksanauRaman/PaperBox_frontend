import { AppEvent } from '../../app-event.interface';
import { AppEventName } from '../../app-event-name.enum';
import { MakeHelpOfferStatusUpdateRequestPayload } from './payload';

export class MakeHelpOfferStatusUpdateRequest
  implements AppEvent<MakeHelpOfferStatusUpdateRequestPayload>
{
  public readonly name = AppEventName.MAKE_HELP_OFFER_STATUS_UPDATE_REQUEST;
  public readonly payload: MakeHelpOfferStatusUpdateRequestPayload;

  constructor(payload: MakeHelpOfferStatusUpdateRequestPayload) {
    this.payload = payload;
  }
}
