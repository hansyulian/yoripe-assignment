import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailTakenException extends HttpException {
  constructor() {
    super("EmailTaken", HttpStatus.BAD_REQUEST);
  }
}
