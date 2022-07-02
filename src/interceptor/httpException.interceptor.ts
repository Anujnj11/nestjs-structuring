import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
  HttpStatus,
  Inject,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
import { environment } from 'src/constants';

@Injectable()
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  env: string;
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    private readonly config: ConfigService,
  ) {
    this.env = this.config.get('nodeEnv');
  }
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    statusCode = statusCode ? statusCode : HttpStatus.INTERNAL_SERVER_ERROR;

    const errMessage: any =
      exception instanceof HttpException ? exception.getResponse() : exception;

    const message: any = this.extractErrorMessage(errMessage, this.env);

    const reqObj = { url: request.url, body: request.body };

    const errorMsg = {
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: typeof message?.msg === 'string' ? [message?.msg] : message,
      data: null,
      success: false,
      errorCode: message?.errorCode || null,
    };

    //Log error only for exception response else mark it to Info log
    if ([HttpStatus.INTERNAL_SERVER_ERROR].includes(statusCode)) {
      this.logger.error(message, reqObj, exception);
    } else {
      this.logger.info(message, reqObj, exception);
    }

    response.status(statusCode).json(errorMsg);
  }

  /**
   * Extract exception message
   * @param errMessage {any}
   * @returns {string}
   */
  private extractErrorMessage(errMessage: any, env: any): string {
    let errorMessage: any = { msg: '', errorCode: '' };
    if (errMessage?.stack && ![environment.production].includes(env)) {
      errorMessage.msg = errMessage.stack;
      errorMessage.errorCode = errMessage?.CODE;
    } else if (errMessage?.MSG) {
      errorMessage.msg = errMessage.MSG;
      errorMessage.errorCode = errMessage?.CODE;
    } else {
      errorMessage = JSON.stringify(errMessage);
    }
    return errorMessage;
  }
}
