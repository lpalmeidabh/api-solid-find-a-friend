export class InvalidCredentialsError extends Error {
  constructor() {
    super('User Credentials are invalid')
  }
}
