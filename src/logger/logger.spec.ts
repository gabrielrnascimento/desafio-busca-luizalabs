import { LogLevel, Logger } from './logger';

import fs from 'fs/promises';

const mockTime = new Date('2023-01-01');

jest.useFakeTimers()
  .setSystemTime(mockTime);

describe('Logger', () => {
  test('should log an info message', async () => {
    const appendFileSpy = jest.spyOn(fs, 'appendFile');
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn());

    appendFileSpy.mockImplementation(jest.fn());
    const mockFilePath = 'any/random/path.log';
    const logger = new Logger(mockFilePath);
    const mockMessage = 'any random message';
    const mockTimestamp = mockTime.toISOString();

    await logger.info(mockMessage);

    const expectedMessage = `[${mockTimestamp}] [${LogLevel.INFO}]: ${mockMessage}\n`;

    expect(appendFileSpy).toHaveBeenCalledWith(mockFilePath, expectedMessage);
    expect(consoleLogSpy).not.toHaveBeenCalledWith(mockMessage);
  });
});
