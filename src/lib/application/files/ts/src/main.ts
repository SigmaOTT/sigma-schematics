import { INestApplication, Logger } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder'
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module'
import { AllExceptionsFilter, MongoExceptionFilter } from '@sigmaott/common';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as config from 'config'
import * as morgan from 'morgan'
import { AppModule } from './app.module'

bootstrap()
async function bootstrap() {
  const port: number = config.get('server.port')
  const host: string = config.get('server.host')
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), { cors: true });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new MongoExceptionFilter());
  app.setGlobalPrefix(config.get('server.base_path'))
  app.disable('x-powered-by');
  enableLogRequest(app)
  enableSwagger(app)
  enableValidationRequest(app)
  await app.listen(port, host)
}

function enableLogRequest(app: INestApplication) {
  const logger = new Logger('HTTPRequest')
  const format =
    ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":response-time ms"'

  app.use(
    morgan(format, {
      stream: { write: s => logger.verbose(s) },
      skip: req => req.url.includes('/health'),
    }),
  )
}

function enableSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  const apiDocsPath = config.get('server.base_path') + '/api-docs'

  SwaggerModule.setup(apiDocsPath, app, document)
}

function enableValidationRequest(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true}))
}
