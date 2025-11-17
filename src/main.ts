import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';
import { ResponseInterceptor } from './lib/interceptor/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CacheHeaderInterceptor } from './common/interceptors/cache-header.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1', {
    exclude: [
      { path: '', method: RequestMethod.GET },
      { path: '/health', method: RequestMethod.ALL },
    ],
  });
  app.useGlobalInterceptors(
    new ResponseInterceptor(),

new CacheHeaderInterceptor(),);

    const config = new DocumentBuilder()
    .setTitle('My API Docs')
    .setDescription('API documentation for backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
