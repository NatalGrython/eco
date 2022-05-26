import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan());

  app.enableCors({ origin: '*' });
  await app.listen(process.env.PORT);
}
bootstrap();
