import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/models/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { config } from "src/config/app";

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
  providers: [AuthService],
})
export class AuthModule { }
