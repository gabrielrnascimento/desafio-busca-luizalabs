
import { MESSAGES } from '../utils/constants';

import fs from 'fs/promises';

export enum LogLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG'
}

export class Logger {
  constructor (private readonly logFilePath: string) {
    this.logFilePath = logFilePath;
  }

  private getCurrentTimestamp (): string {
    const now = new Date();
    return now.toISOString();
  }

  private async log (level: LogLevel, message: string): Promise<void> {
    const logEntry = `[${this.getCurrentTimestamp()}] [${level}]: ${message}\n`;
    try {
      await fs.appendFile(this.logFilePath, logEntry);
    } catch (error) {
      console.error(MESSAGES.DEFAULT_ERROR, error);
    }
  }

  public async info (message: string, shouldConsoleLog: boolean = false): Promise<void> {
    await this.log(LogLevel.INFO, message);
    if (shouldConsoleLog) {
      console.log(message);
    }
  }

  public async error (message: string): Promise<void> {
    console.error(message);
    await this.log(LogLevel.ERROR, message);
  }

  public async debug (message: string): Promise<void> {
    await this.log(LogLevel.DEBUG, message);
  }
}
