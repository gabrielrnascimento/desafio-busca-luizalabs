import { Logger } from '../logger/logger';
import { mockDirectoryFiles } from '../test/mocks';
import { MESSAGES, NAMES } from '../utils/constants';
import { multipleResultsFirstMessage, multipleResultsSecondMessage, notFoundResultsMessage, singleResultFirstMessage, singleResultSecondMessage } from '../utils/responses';
import { type Term } from '../utils/types';

import { CLI } from './cli';

jest.mock('fs/promises', () => ({
  appendfile: jest.fn()
}));

type SutTypes = {
  sut: CLI
  consoleErrorSpy: jest.SpyInstance
  processExitSpy: jest.SpyInstance
  consoleLogSpy: jest.SpyInstance
  args: string[]
  searchTerm: Term
};

const makeSut = (args: string[] = ['node', 'any-file.ts', 'any search term']): SutTypes => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

  const searchTerm = 'any search term';

  process.argv = args;
  const logger = new Logger('any/file/path.log');
  const sut = new CLI(logger);

  return {
    sut,
    consoleErrorSpy,
    processExitSpy,
    consoleLogSpy,
    args,
    searchTerm
  };
};

describe('CLI', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('handleInput', () => {
    test('should display an error if no search term is provided', async () => {
      const args = ['node', 'any-file.ts'];
      const { sut, consoleErrorSpy, processExitSpy } = makeSut(args);
      await sut.handleInput();

      expect(consoleErrorSpy).toHaveBeenCalledWith(MESSAGES.SEARCH_TERM_NOT_PROVIDED);
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    test('should display an error if more than 3 arguments are provided', async () => {
      const args = ['node', 'any-file.ts', 'any search term', 'extra argument'];
      const { sut, consoleErrorSpy, processExitSpy } = makeSut(args);
      await sut.handleInput();

      expect(consoleErrorSpy).toHaveBeenCalledWith(MESSAGES.TOO_MANY_ARGUMENTS_PROVIDED);
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    test('should return search term on success', async () => {
      const { sut, args } = makeSut();
      jest.restoreAllMocks();

      const searchTerm = await sut.handleInput();

      expect(searchTerm).toBe(args[2]);
    });
  });
  describe('handleOutput', () => {
    test('should display a specific message if no documents are provided', async () => {
      const documentsFound: string[] = [];
      const { sut, consoleLogSpy, searchTerm } = makeSut();
      await sut.handleOutput(searchTerm, documentsFound);
      expect(consoleLogSpy).toHaveBeenCalledWith(notFoundResultsMessage(searchTerm));
    });
    test('should display specific messages containg file count and file name in case only one document is provided', async () => {
      const documentsFound: string[] = ['only-file.txt'];
      const { sut, consoleLogSpy, searchTerm } = makeSut();
      await sut.handleOutput(searchTerm, documentsFound);
      expect(consoleLogSpy).toHaveBeenCalledWith(singleResultFirstMessage(searchTerm));
      expect(consoleLogSpy).toHaveBeenCalledWith(singleResultSecondMessage(searchTerm));
      expect(consoleLogSpy).toHaveBeenCalledWith(`${NAMES.DATA_FOLDER_NAME}/${documentsFound[0]}`);
    });
    test('should display specific messages containg file count and file names in case multiple documents are provided', async () => {
      const { sut, consoleLogSpy, searchTerm } = makeSut();
      const documentsFound: string[] = mockDirectoryFiles;
      await sut.handleOutput(searchTerm, documentsFound);
      expect(consoleLogSpy).toHaveBeenCalledWith(multipleResultsFirstMessage(searchTerm, documentsFound));
      expect(consoleLogSpy).toHaveBeenCalledWith(multipleResultsSecondMessage(searchTerm, documentsFound));
      documentsFound.forEach(document => {
        expect(consoleLogSpy).toHaveBeenCalledWith(`${NAMES.DATA_FOLDER_NAME}/${document}`);
      });
    });
  });
});
