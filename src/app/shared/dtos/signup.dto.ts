export class SignupDto {
  constructor(
    public readonly fullName: string,
    public readonly email: string,
    public readonly password: string
  ) {}
}
