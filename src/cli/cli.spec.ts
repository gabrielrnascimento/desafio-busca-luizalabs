import { CLI } from './cli';

describe('CLI', () => {
  test('should display an error if no search term is provided', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();

    process.argv = ['node', 'any-file.ts'];
    const cli = new CLI();
    cli.handleInput();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Insira um termo de busca');
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });
});
