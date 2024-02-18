import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "./config/app";
import { AuthModule } from "./auth/auth.module";
import { TaskModule } from "./task/task.module";
import { AuthGuard } from "./auth/auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoConnectionString),
    JwtModule.register({
      global: true,
      secret: config.jwtSecret,
      signOptions: {
        expiresIn: "2h",
      },
    }),
    AuthModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
