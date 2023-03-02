export class CreateFeedbackDto {
  constructor(
    public readonly fullName: string,
    public readonly email: string,
    public readonly comment: string
  ) {}
}
