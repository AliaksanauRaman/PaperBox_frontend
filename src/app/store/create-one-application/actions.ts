import { CreateHelpRequestDto } from '@shared/dtos/create-help-request.dto';
import { PublishedHelpRequest } from '@shared/models/published-help-request.model';

export class CreateOneApplication {
  public static type = '[Applications] Create one';
  // TODO: CreateApplicationDto
  constructor(public readonly createApplicationDto: CreateHelpRequestDto) {}
}

export class DestroyCreateOneApplication {
  public static type = '[Applications] Destroy Create One';
}

export class CreateOneApplicationSuccess {
  public static type = '[Applications] Create One Success';
  // TODO: PublishedApplication
  constructor(public readonly createdApplication: PublishedHelpRequest) {}
}

export class CreateOneApplicationFail {
  public static type = '[Applications] Create One Fail';
  constructor(public readonly error: unknown) {}
}

export class ResetCreateOneApplication {
  public static type = '[Applications] Reset Create One';
}
