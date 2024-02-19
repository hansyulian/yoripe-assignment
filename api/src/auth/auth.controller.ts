import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "../decorators/PublicDecorator";
import { UserLoginPayload, UserRegisterPayload } from "src/models/user.schema";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get("/me")
  async me(@Req() req: AuthenticatedRequest) {
    const { id } = req.user;
    const { email, fullname } = await this.authService.getUserInfoById(id);
    return {
      email,
      fullname,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("/login")
  async login(@Body(new ValidationPipe()) data: UserLoginPayload) {
    const result = await this.authService.login(data);
    return {
      token: result.token,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("/register")
  async register(@Body(new ValidationPipe()) data: UserRegisterPayload) {
    const newUser = await this.authService.register(data);
    const { email, fullname } = newUser;
    return {
      email,
      fullname,
    };
  }
}
