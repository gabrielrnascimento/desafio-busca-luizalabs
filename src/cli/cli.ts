export class CLI {
  handleInput (): void {
    const [, , searchTerm] = process.argv;
    if (!searchTerm) {
      console.error('Insira um termo de busca');
      process.exit(1);
    }
  }
}
