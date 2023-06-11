export class CLI {
  handleInput (): void {
    const args = process.argv;
    const [, , searchTerm] = args;
    if (!searchTerm) {
      console.error('Insira um termo de busca');
      process.exit(1);
    }
    if (args.length > 3) {
      console.error('Número excessivo de parâmetros. Forneça apenas um termo de busca');
      process.exit(1);
    }
  }
}
