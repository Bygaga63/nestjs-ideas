import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception.message.error || exception.message || '';
    const errorResponse = {
      code: status,
      timeStamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message,
    };

    Logger.error(`${request.method} ${request.url}`, JSON.stringify(errorResponse), 'ExceptionFilter');

    response.status(status).json(errorResponse);
  }
}
