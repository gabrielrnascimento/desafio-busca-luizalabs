import { multipleResultsFirstMessage, multipleResultsSecondMessage, notFoundResultsMessage, searchTermNotProvidedMessage, singleResultFirstMessage, singleResultSecondMessage, tooManyArgumentsProvidedMessage } from '../utils/messages';
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
      console.error(searchTermNotProvidedMessage);
      process.exit(1);
    }
    if (args.length > 3) {
      console.error(tooManyArgumentsProvidedMessage);
      process.exit(1);
    }
    return searchTerm;
  }

  private noResultsFound (searchTerm: Term): void {
    console.log(notFoundResultsMessage(searchTerm));
  }

  private singleResultFound (searchTerm: Term, documents: DocumentTitle[]): void {
    console.log(singleResultFirstMessage(searchTerm));
    console.log(singleResultSecondMessage(searchTerm));
    console.log(`${documents[0]}`);
  }

  private multipleResultFound (searchTerm: Term, documents: DocumentTitle[]): void {
    console.log(multipleResultsFirstMessage(searchTerm, documents));
    console.log(multipleResultsSecondMessage(searchTerm, documents));
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
