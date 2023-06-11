import { type Term, type DocumentTitle } from '../utils/types';

export class CLI {
  public handleInput (): string {
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
    return searchTerm;
  }

  public handleOutput (searchTerm: Term, documents: DocumentTitle[]): void {
    const documentCount = documents.length;
    if (documentCount === 0) {
      console.log(`Não foi encontrada nenhuma ocorrência pelo termo "${searchTerm}"`);
    }
  }
}
