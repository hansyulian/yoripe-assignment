import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "./config/app";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.serverPort, () => {
    console.log("API Server started at port", config.serverPort)
  });
}
bootstrap();
