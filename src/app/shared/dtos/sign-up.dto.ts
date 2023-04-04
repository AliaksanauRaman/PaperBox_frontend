export class SignUpDto {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}
