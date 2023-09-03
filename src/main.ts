import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { snapshot: true });

  app.setGlobalPrefix('api');

  if (process.env.NODE_ENV === 'production') app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Gastaderapp API')
    .setDescription('API para la aplicación Gastaderapp')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme('v3');
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Docs | Gastaderapp API',
    customCss: theme.getBuffer('flattop'),
    swaggerOptions: {
      tagsSorter: 'alpha',
      docExpansion: 'none',
      persistAuthorization: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
