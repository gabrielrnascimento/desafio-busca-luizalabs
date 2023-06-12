import { LogLevel, Logger } from './logger';

import fs from 'fs/promises';

const mockTime = new Date('2023-01-01');

jest.useFakeTimers()
  .setSystemTime(mockTime);

type SutTypes = {
  sut: Logger
  appendFileSpy: jest.SpyInstance
  consoleLogSpy: jest.SpyInstance
  mockMessage: string
  mockTimestamp: string
  mockFilePath: string
};

const makeSut = (): SutTypes => {
  const appendFileSpy = jest.spyOn(fs, 'appendFile');
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn());

  appendFileSpy.mockImplementation(jest.fn());
  const mockFilePath = 'any/random/path.log';
  const sut = new Logger(mockFilePath);
  const mockMessage = 'any random message';
  const mockTimestamp = mockTime.toISOString();

  return {
    sut,
    appendFileSpy,
    consoleLogSpy,
    mockMessage,
    mockTimestamp,
    mockFilePath
  };
};

describe('Logger', () => {
  test('should log an info message', async () => {
    const { sut, mockMessage, mockTimestamp, appendFileSpy, mockFilePath, consoleLogSpy } = makeSut();

    await sut.info(mockMessage);

    const expectedMessage = `[${mockTimestamp}] [${LogLevel.INFO}]: ${mockMessage}\n`;

    expect(appendFileSpy).toHaveBeenCalledWith(mockFilePath, expectedMessage);
    expect(consoleLogSpy).not.toHaveBeenCalledWith(mockMessage);
  });

  test('should console.log an info message if parameter is true', async () => {
    const { sut, mockMessage, mockTimestamp, appendFileSpy, mockFilePath, consoleLogSpy } = makeSut();

    await sut.info(mockMessage, true);

    const expectedMessage = `[${mockTimestamp}] [${LogLevel.INFO}]: ${mockMessage}\n`;

    expect(appendFileSpy).toHaveBeenCalledWith(mockFilePath, expectedMessage);
    expect(consoleLogSpy).toHaveBeenCalledWith(mockMessage);
  });
});
