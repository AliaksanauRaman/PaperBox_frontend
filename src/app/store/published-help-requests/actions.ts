import {
  ListOfPublishedHelpRequests,
  PublishedHelpRequest,
} from '@shared/models/published-help-request.model';

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
      public readonly listOfPublishedHelpRequests: ListOfPublishedHelpRequests
    ) {}
  }

  export class GetFail {
    public static type = '[Published Help Requests] Get Fail';
    constructor(public readonly error: unknown) {}
  }

  export class DeleteOne {
    public static type = '[Published Help Requests] Delete One';
    constructor(public readonly helpRequestId: number) {}
  }

  export class DestroyDeleteOne {
    public static type = '[Published Help Requests] Destroy Delete One';
  }

  export class DeleteOneSuccess {
    public static type = '[Published Help Requests] Delete One Success';
    constructor(public readonly deletedHelpRequestId: number) {}
  }

  export class DeleteOneFail {
    public static type = '[Published Help Requests] Delete One Fail';
    constructor(public readonly error: unknown) {}
  }

  export class PrependOne {
    public static type = '[Published Help Requests] Prepend';
    constructor(public readonly publishedHelpRequest: PublishedHelpRequest) {}
  }

  export class DisableOne {
    public static type = '[Published Help Requests] Disable One';
    constructor(public readonly helpRequestIdToDisable: number) {}
  }

  export class EnableOne {
    public static type = '[Published Help Requests] Enable One';
    constructor(public readonly helpRequestIdToEnable: number) {}
  }
}
