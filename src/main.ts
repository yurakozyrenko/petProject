import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Project api')
    .setDescription('This api Project')
    .setVersion('1.0')
    .addTag('API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);

  const HTTP_PORT = configService.getOrThrow('HTTP_PORT');

  await app.listen(HTTP_PORT, () => {
    console.log(`🚀 Server listening ${HTTP_PORT} `);
  });
}
bootstrap();
