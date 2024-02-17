import { Module } from "@nestjs/common";
import { AppController } from "./controllers/app.controller";
import { AppService } from "./services/app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "./config/app";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [MongooseModule.forRoot(config.mongoConnectionString), AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }
