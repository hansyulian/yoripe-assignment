import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserLoginPayload, UserRegisterPayload } from "src/models/user.schema";
import { SessionService } from "src/services/session.service";

@Controller("session")
export class SessionController {
  constructor(private readonly sessionService: SessionService) { }

  @Get("/me")
  me() {
    return "Ok";
  }

  @Post("/login")
  async login(@Body() data: UserLoginPayload) {
    const result = await this.sessionService.login(data);
    return {
      token: result.token,
    };
  }

  @Post("/register")
  async register(@Body() data: UserRegisterPayload) {
    const newUser = await this.sessionService.register(data);
    const { email, fullname } = newUser;
    return {
      email,
      fullname
    };
  }
}
