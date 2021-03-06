import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('users_jmv');
  const options = new DocumentBuilder()
    .setTitle('Users Sample')
    .setDescription('CRUD Users sample')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  // http://localhost:3000/swagger/
  await app.listen(3000);
}
bootstrap();
