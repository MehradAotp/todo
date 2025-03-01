/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { main as mainSwagger } from './swagger';
import { Logger as NestLogger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: false,
  });
  app.enableCors({
    origin: 'http://localhost:5000',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
  });
  // for uploading base64 files
  app.use(bodyParser.json({ limit: '20mb' }));

  mainSwagger(app);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  NestLogger.log(`Application is running on: http://localhost:${port}`);
}

void bootstrap();
