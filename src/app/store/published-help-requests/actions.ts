import { ListOfPublishedHelpRequestsType } from '../../shared/types/list-of-published-help-requests.type';
import { PublishedHelpRequestType } from '../../shared/types/published-help-request.type';

export namespace PublishedHelpRequests {
  export class Get {
    public static type = '[Published Help Requests] Get';
  }

  export class DestroyGet {
    public static type = '[Published Help Requests] Destroy Get';
  }

  export class GetSuccess {
    public static type = '[Published Help Requests] Get Success';
    constructor(
      public readonly listOfPublishedHelpRequests: ListOfPublishedHelpRequestsType
    ) {}
  }

  export class GetFail {
    public static type = '[Published Help Requests] Get Fail';
    constructor(public readonly error: unknown) {}
  }

  export class Prepend {
    public static type = '[Published Help Requests] Prepend';
    constructor(
      public readonly publishedHelpRequest: PublishedHelpRequestType
    ) {}
  }
}
