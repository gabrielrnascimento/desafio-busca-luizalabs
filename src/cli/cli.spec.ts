import { CLI } from './cli';

type SutTypes = {
  sut: CLI
  consoleErrorSpy: jest.SpyInstance
  processExitSpy: jest.SpyInstance
};

const makeSut = (args: string[]): SutTypes => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();

  process.argv = args;
  const sut = new CLI();

  return {
    sut,
    consoleErrorSpy,
    processExitSpy
  };
};

describe('CLI', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should display an error if no search term is provided', () => {
    const args = ['node', 'any-file.ts'];
    const { sut, consoleErrorSpy, processExitSpy } = makeSut(args);
    sut.handleInput();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Insira um termo de busca');
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });
});
