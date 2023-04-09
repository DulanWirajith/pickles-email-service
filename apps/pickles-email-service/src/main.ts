import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // for swagger
  const config = new DocumentBuilder()
    .setTitle('Pickles Email Service')
    .setDescription('Pickles Email Service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // for sentry
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  });

  // =>  FOR ENABLE CORS
  app.enableCors({
    allowedHeaders: ['content-type', 'authorization'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin: '*',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
    // FIXME This will prevent empty body
    // new ValidatePayloadExistsPipe(),
  );
  await app.listen(3000, '0.0.0.0');
}

bootstrap();
