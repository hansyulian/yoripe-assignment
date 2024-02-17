import { Module } from "@nestjs/common";
import { AppController } from "./controllers/app.controller";
import { AppService } from "./services/app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "./config/app";
import { SessionController } from "./controllers/session.controller";
import { JwtModule } from "@nestjs/jwt";
import { SessionService } from "./services/session.service";
import { User, UserSchema } from "./models/user.schema";

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoConnectionString),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: config.jwtSecret,
      signOptions: {
        expiresIn: "2h",
      },
    }),
  ],
  controllers: [AppController, SessionController],
  providers: [AppService, SessionService],
})
export class AppModule { }
