type CreateFeedbackRequestBodyType = Readonly<{
  fullName: string;
  email: string;
  comment: string;
}>;

export class CreateFeedbackDto {
  constructor(
    private readonly fullName: string,
    private readonly email: string,
    private readonly comment: string
  ) {}

  public toRequestBody(): CreateFeedbackRequestBodyType {
    return {
      fullName: this.fullName,
      email: this.email,
      comment: this.comment,
    };
  }
}
