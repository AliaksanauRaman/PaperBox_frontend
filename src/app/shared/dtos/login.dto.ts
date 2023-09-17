export class LoginDto {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  public toObject() {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
