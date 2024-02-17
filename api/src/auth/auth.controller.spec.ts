import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../models/user.schema";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";
import { config } from "../config/app";

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: config.jwtSecret,
          signOptions: {
            expiresIn: "2h",
          },
        }),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
