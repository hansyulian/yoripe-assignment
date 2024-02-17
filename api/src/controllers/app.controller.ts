import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { Response } from "express";
import { AppService } from "../services/app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  index(@Res() response: Response) {
    const result = this.appService.index();
    return response.status(HttpStatus.OK).json(result);
  }
}
