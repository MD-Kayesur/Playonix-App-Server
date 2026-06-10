import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ensure uploads directory exists
  const uploadsDir = join(process.cwd(), 'uploads');
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir);
  }

  // Serve static files from the uploads directory
  app.use('/uploads', express.static(uploadsDir));

  // set global prefix
  app.setGlobalPrefix('api/v1');

  // set global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*' || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'accept'],
    credentials: true,
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Nest.js REST API')
    .setDescription('Nest.js REST API Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-refresh',
    )
    .addServer(`http://localhost:${process.env.PORT ?? 3000}`, 'Development server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'API Documentation',
    customfavIcon: 'https://swagger.io/favicon.ico',
    customCss: `
    .swagger-ui .topbar  { display : none }
    .swagger-ui .info {margin: 50px 0}
    .swagger-ui .info .title{font-size: 2.5em}
    `,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  Logger.log(`Server is running on: http://localhost:${port}`);
  Logger.log(`Swagger docs available at: http://localhost:${port}/api/v1/docs`);
}
bootstrap().catch((error) => {
  Logger.error('Failed to start server:', error);
  process.exit(1);
});
