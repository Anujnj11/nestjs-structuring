import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function Swagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Nest API')
    .setDescription('Nest API Documentation')
    // .addBearerAuth(undefined, BearerAuthentications.Member)
    // .addBearerAuth(undefined, BearerAuthentications.Customer)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
}
