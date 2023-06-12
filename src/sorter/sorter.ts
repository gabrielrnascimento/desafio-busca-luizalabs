import { type Term, type DocumentTitle } from '../utils/types';

export class Sorter {
  private splitIntoWordsAndNumbers (documentTitle: DocumentTitle): Term[] {
    const regex = /(\d+[\w-]*)|([^\d-]+)/g;
    return documentTitle.match(regex) ?? [];
  }

  private isNonNumeric (token: Term): boolean {
    return isNaN(parseInt(token));
  }

  private compareStrings (firstDocumentToken: Term, secondDocumentToken: string): number {
    return firstDocumentToken.localeCompare(secondDocumentToken);
  }

  private compareNumbers (firstDocumentToken: Term, secondDocumentToken: string): number {
    return parseInt(firstDocumentToken) - parseInt(secondDocumentToken);
  }

  public sort (documents: DocumentTitle[]): DocumentTitle[] {
    return documents.sort((firstDocument, secondDocument) => {
      const firstDocumentTokens = this.splitIntoWordsAndNumbers(firstDocument);
      const secondDocumentTokens = this.splitIntoWordsAndNumbers(secondDocument);

      const minLength = Math.min(firstDocumentTokens.length, secondDocumentTokens.length);
      for (let i = 0; i < minLength; i++) {
        const firstDocumentToken = firstDocumentTokens[i];
        const secondDocumentToken = secondDocumentTokens[i];

        if (this.isNonNumeric(firstDocumentToken) || this.isNonNumeric(secondDocumentToken)) {
          const result = this.compareStrings(firstDocumentToken, secondDocumentToken);
          if (result !== 0) {
            return result;
          }
        } else {
          const result = this.compareNumbers(firstDocumentToken, secondDocumentToken);
          return result;
        }
      }

      return firstDocument.length - secondDocument.length;
    });
  }
}
