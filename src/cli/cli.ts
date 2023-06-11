import { type Term, type DocumentTitle } from '../utils/types';

enum ResultsQuantity {
  noResults = 0,
  singleResult = 1
}

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

  private noResultsFound (searchTerm: Term): void {
    console.log(`Não foi encontrada nenhuma ocorrência pelo termo "${searchTerm}"`);
  }

  private singleResultFound (searchTerm: Term, documents: DocumentTitle[]): void {
    console.log(`Foi encontrada 1 ocorrência pelo termo "${searchTerm}"`);
    console.log(`O arquivo que possui "${searchTerm}" é:`);
    console.log(`${documents[0]}`);
  }

  private multipleResultFound (searchTerm: Term, documents: DocumentTitle[]): void {
    console.log(`Foram encontradas ${documents.length} ocorrências pelo termo "${searchTerm}"`);
    console.log(`Os arquivos que possuem "${searchTerm}" são:`);
    documents.forEach(document => { console.log(document); });
  }

  public handleOutput (searchTerm: Term, documents: DocumentTitle[]): void {
    const documentCount = documents.length;
    switch (documentCount) {
      case ResultsQuantity.noResults:
        this.noResultsFound(searchTerm);
        break;
      case ResultsQuantity.singleResult:
        this.singleResultFound(searchTerm, documents);
        break;
      default:
        this.multipleResultFound(searchTerm, documents);
    }
  }
}
