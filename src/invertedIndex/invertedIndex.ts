import { type Analyzer } from '../analyzer';

type DocumentTitle = string;
type Term = string;

export type InvertedIndexType = Map<Term, Set<DocumentTitle>>;

export class InvertedIndex {
  index: InvertedIndexType;

  constructor (private readonly analyzer: Analyzer) {
    this.index = new Map<Term, Set<DocumentTitle>>();
  }

  public insert (title: string, content: string): void {
    const tokens = this.analyzer.transform(content);
    for (const token of tokens) {
      if (!this.index.has(token)) {
        this.index.set(token, new Set<DocumentTitle>());
      }
      this.index.get(token)?.add(title);
    }
  }
}
