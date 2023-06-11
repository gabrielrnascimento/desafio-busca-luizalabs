import { type Analyzer } from '../analyzer';
import { type InvertedIndexType, type DocumentTitle, type Term } from '../utils/types';

export class InvertedIndex {
  index: InvertedIndexType;

  constructor (private readonly analyzer: Analyzer) {
    this.index = new Map<Term, Set<DocumentTitle>>();
  }

  public insert (title: DocumentTitle, content: string): void {
    const tokens = this.analyzer.transform(content);
    for (const token of tokens) {
      if (!this.index.has(token)) {
        this.index.set(token, new Set<DocumentTitle>());
      }
      this.index.get(token)?.add(title);
    }
  }

  public find (token: Term): Set<DocumentTitle> {
    [token] = this.analyzer.transform(token);
    return new Set<DocumentTitle>(this.index.get(token));
  }
}
