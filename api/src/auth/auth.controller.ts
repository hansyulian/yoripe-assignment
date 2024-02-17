import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLoginPayload, UserRegisterPayload } from "src/models/user.schema";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get("/me")
  me() {
    return "Ok";
  }

  @Post("/login")
  async login(@Body() data: UserLoginPayload) {
    const result = await this.authService.login(data);
    return {
      token: result.token,
    };
  }

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
