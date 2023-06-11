import { type Analyzer } from '../analyzer';
import { type InvertedIndex } from '../invertedIndex';

export class Searcher {
  constructor (
    private readonly analyzer: Analyzer,
    private readonly index: InvertedIndex
  ) {}

  private intersection (firstDocuments: Set<string>, secondDocuments: Set<string>): Set<string> {
    firstDocuments.forEach(document => {
      if (!secondDocuments.has(document)) {
        firstDocuments.delete(document);
      }
    });
    return firstDocuments;
  }

  private match (firstDocuments: Set<string>, secondDocuments: Set<string>, operator: string = 'AND'): Set<string> {
    switch (operator) {
      default:
        return this.intersection(firstDocuments, secondDocuments);
    }
  }

  public search (query: string): string[] {
    const terms = this.analyzer.transform(query);
    let matchingDocuments = this.index.find(terms[0]);
    if (terms.length > 1) {
      for (let i = 1; i < terms.length; i++) {
        const documents = this.index.find(terms[i]);
        matchingDocuments = this.match(matchingDocuments, documents);
      }
    }
    return [...matchingDocuments].sort()
    ;
  }
}
