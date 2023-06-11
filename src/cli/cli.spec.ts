import { CLI } from './cli';

type SutTypes = {
  sut: CLI
  consoleErrorSpy: jest.SpyInstance
  processExitSpy: jest.SpyInstance
  consoleLogSpy: jest.SpyInstance
  args: string[]
};

const makeSut = (args: string[] = ['node', 'any-file.ts', 'any search term']): SutTypes => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

  process.argv = args;
  const sut = new CLI();

  return {
    sut,
    consoleErrorSpy,
    processExitSpy,
    consoleLogSpy,
    args
  };
};

describe('CLI', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('handleInput', () => {
    test('should display an error if no search term is provided', () => {
      const args = ['node', 'any-file.ts'];
      const { sut, consoleErrorSpy, processExitSpy } = makeSut(args);
      sut.handleInput();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Insira um termo de busca');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
    test('should display an error if more than 3 arguments are provided', () => {
      const args = ['node', 'any-file.ts', 'any search term', 'extra argument'];
      const { sut, consoleErrorSpy, processExitSpy } = makeSut(args);
      sut.handleInput();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Número excessivo de parâmetros. Forneça apenas um termo de busca');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    test('should return search term on success', () => {
      const { sut, args } = makeSut();
      jest.restoreAllMocks();

      const searchTerm = sut.handleInput();

      expect(searchTerm).toBe(args[2]);
    });
  });
  describe('handleOutput', () => {
    test('should display a specific message if no documents are provided', () => {
      const documentsFound: string[] = [];
      const searchTerm = 'any search term';
      const { sut, consoleLogSpy } = makeSut();
      sut.handleOutput(searchTerm, documentsFound);
      expect(consoleLogSpy).toHaveBeenCalledWith(`Não foi encontrada nenhuma ocorrência pelo termo "${searchTerm}"`);
    });
  });
});
