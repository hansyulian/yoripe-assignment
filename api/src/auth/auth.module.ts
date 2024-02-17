import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../models/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { config } from "../config/app";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";

@Module({
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
  providers: [AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },],
})
export class AuthModule { }
