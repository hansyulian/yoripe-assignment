import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidCredentialException extends HttpException {
  constructor() {
    super("InvalidCredential", HttpStatus.BAD_REQUEST);
  }
}
