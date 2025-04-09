import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule);
  logger.log('NestApplication created');

  // Global configuration
  app.enableCors();
  logger.log('CORS enabled');
  app.setGlobalPrefix('api/v1');
  logger.log('Global prefix set to api/v1');
  app.useGlobalPipes(new ValidationPipe());
  logger.log('Validation pipe enabled');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('RESTful API built with NestJS framework')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();
  logger.log('Swagger configuration completed');

  const document = SwaggerModule.createDocument(app, config);
  logger.log('Swagger document created');

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'API Documentation',
  });
  logger.log('Swagger setup completed');

  // Start server
  await app.listen(process.env.PORT ?? 3000);
  const appUrl = await app.getUrl();
  logger.log(`🚀 Server ready at ${appUrl}`);
  logger.log(`🚀 API Documentation: ${appUrl}/docs`);
}
bootstrap();
