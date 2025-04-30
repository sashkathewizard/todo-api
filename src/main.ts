import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { RequestLoggerMiddleware } from './utils/request-logger.middleware';
import { AdminSeeder } from './database/seeders/admin.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe());

  const requestLogger = new RequestLoggerMiddleware();
  app.use(requestLogger.use);

  try {
    const adminSeeder = app.get(AdminSeeder);
    await adminSeeder.seed();
  } catch (error) {
    console.error('Seeded Admin already created:', error);
  }

  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('Task management API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port ?? 3000);
}
bootstrap();
