import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter, MongoExceptionFilter } from '@sigmaott/common';
import * as bodyParser from 'body-parser';
import * as config from 'config';
import * as morgan from 'morgan';
import { AppModule } from './module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

bootstrap();

async function bootstrap() {
  const port: number = config.get('http.port');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), { cors: true });

  app.enableCors();
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.setGlobalPrefix(config.get('http.base_path'));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new MongoExceptionFilter());
  enableLogRequest(app);
  enableSwagger(app);
  enableValidationRequest(app);

  await app.listen(port, '0.0.0.0');
  await app.startAllMicroservices();
}

function enableLogRequest(app: INestApplication) {
  const format =
    ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":response-time ms"';

  app.use(morgan(format));
}

function enableSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Interactive Livestream Campaign Service')
    .setDescription('Interactive Livestream Campaign Service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const apiDocsPath = config.get('http.base_path') + '/api-docs';

  SwaggerModule.setup(apiDocsPath, app, document);
}

function enableValidationRequest(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
}
