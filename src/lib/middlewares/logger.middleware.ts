import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const logger = new Logger('REQUEST_LOGGER');
    res.on('finish', () => {
      const duration = Date.now() - start;
      const timestamp = new Date().toISOString();
      const method = req.method;
      const fullUrl = req.originalUrl;
      const status = res.statusCode;
      const ip = req.ip || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'] || '';

      const log = `[${timestamp}] - ${method} - ${fullUrl} - ${status} - ${duration}ms - IP: ${ip} - UA: ${userAgent}`;
      logger.log(log);
    });

    next();
  }
}
