import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config';

const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  // example: add global prefix
  // app.setGlobalPrefix('api/v1');
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
