import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggerMiddleware.name);
  private readonly logFile = path.join(process.cwd(), 'logs', 'requests.log');

  constructor() {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  use = (req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const timestamp = new Date().toISOString();

    this.logger.log(`${method} ${originalUrl} - ${ip} - ${userAgent}`);

    const logMessage = `[${timestamp}] ${method} ${originalUrl} - ${ip} - ${userAgent}\n`;
    fs.appendFileSync(this.logFile, logMessage);

    next();
  };
}
