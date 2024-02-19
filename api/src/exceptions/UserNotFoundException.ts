import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException {
  constructor() {
    super("UserNotFound", HttpStatus.NOT_FOUND);
  }
}
