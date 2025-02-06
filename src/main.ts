import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    // true for all origins
    origin: '*',
  });
  // Activation des pipes de validation globale
  app.useGlobalPipes(new ValidationPipe());

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Mooviie-Booker NESTJS')
    .setDescription("Documentation de l'API Mooviie-Booker avec Swagger")
    .addBearerAuth() // Ajoute le support de l'authentification JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Servir le front-end uniquement en production
  if (process.env.NODE_ENV === 'production') {
    app.useStaticAssets(join(__dirname, '..', 'frontend', 'dist'));
    app.setBaseViewsDir(join(__dirname, '..', 'frontend', 'dist'));
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
