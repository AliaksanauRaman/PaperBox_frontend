export class SignupDto {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}
