import { defaultErrorMessage } from '../utils/messages';

import fs from 'fs/promises';

export enum LogLevel {
  INFO = 'INFO'
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
      console.error(defaultErrorMessage, error);
    }
  }

  public async info (message: string): Promise<void> {
    await this.log(LogLevel.INFO, message);
  }
}
