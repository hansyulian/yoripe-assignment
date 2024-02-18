import { HttpException, HttpStatus } from "@nestjs/common";

export class TaskNotFoundException extends HttpException {
  constructor() {
    super("TaskNotFound", HttpStatus.NOT_FOUND);
  }
}
