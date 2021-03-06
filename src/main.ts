import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '/../upload'));
  app.enableCors({ origin: 'http://localhost:45087', credentials: true });
  await app.listen(3001);
  
}
bootstrap();
