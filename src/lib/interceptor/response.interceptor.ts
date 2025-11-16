import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResponseHandler } from '../interfaces/responseHandler';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseHandler> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        message: data?.message || 'Request successful',
        data: data?.data ?? data,
        timestamp: new Date().toISOString(),
        path: request.url,
      })),
    );
  }
}
