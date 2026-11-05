
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Permite ler cookies nas requisições
  app.use(cookieParser());

  // Prefixo global da API
  app.setGlobalPrefix('api');

  // Validação dos dados recebidos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);

  console.log('API NestJS em http://localhost:3000/api');
}

bootstrap();
