import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "../decorators/PublicDecorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Get("/me")
  me(@Request() req: AuthenticatedRequest) {
    const { email } = req.user;
    return {
      email,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("/login")
  async login(@Body() data: UserLoginPayload) {
    const result = await this.authService.login(data);
    return {
      token: result.token,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("/register")
  async register(@Body() data: UserRegisterPayload) {
    const newUser = await this.authService.register(data);
    const { email, fullname } = newUser;
    return {
      email,
      fullname,
    };
  }
}
