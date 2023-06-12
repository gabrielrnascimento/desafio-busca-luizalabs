import { type Logger } from '../logger/logger';
import { MESSAGES } from '../utils/constants';
import { multipleResultsFirstMessage, multipleResultsSecondMessage, notFoundResultsMessage, singleResultFirstMessage, singleResultSecondMessage } from '../utils/responses';
import { type Term, type DocumentTitle } from '../utils/types';

enum ResultsQuantity {
  noResults = 0,
  singleResult = 1
}

export class CLI {
  constructor (private readonly logger: Logger) {}

  public async handleInput (): Promise<string> {
    const args = process.argv;
    const [, , searchTerm] = args;
    if (!searchTerm) {
      await this.logger.error(MESSAGES.SEARCH_TERM_NOT_PROVIDED);
      process.exit(1);
    }
    if (args.length > 3) {
      await this.logger.error(MESSAGES.TOO_MANY_ARGUMENTS_PROVIDED);
      process.exit(1);
    }
    return searchTerm;
  }

  private async noResultsFound (searchTerm: Term): Promise<void> {
    await this.logger.info(notFoundResultsMessage(searchTerm), true);
  }

  private async singleResultFound (searchTerm: Term, documents: DocumentTitle[]): Promise<void> {
    await this.logger.info(singleResultFirstMessage(searchTerm), true);
    await this.logger.info(singleResultSecondMessage(searchTerm), true);
    await this.logger.info(`${documents[0]}`, true);
  }

  private async multipleResultFound (searchTerm: Term, documents: DocumentTitle[]): Promise<void> {
    await this.logger.info(multipleResultsFirstMessage(searchTerm, documents), true);
    await this.logger.info(multipleResultsSecondMessage(searchTerm, documents), true);
    for (const document of documents) {
      await this.logger.info(document, true);
    }
  }

  public async handleOutput (searchTerm: Term, documents: DocumentTitle[]): Promise<void> {
    const documentCount = documents.length;
    switch (documentCount) {
      case ResultsQuantity.noResults:
        await this.noResultsFound(searchTerm);
        break;
      case ResultsQuantity.singleResult:
        await this.singleResultFound(searchTerm, documents);
        break;
      default:
        await this.multipleResultFound(searchTerm, documents);
    }
  }
}
