import { type Analyzer } from '../analyzer';
import { type InvertedIndex } from '../invertedIndex';

export class Searcher {
  constructor (
    private readonly analyzer: Analyzer,
    private readonly index: InvertedIndex
  ) {}

  public search (query: string): Record<string, string[]> {
    const terms = this.analyzer.transform(query);
    const results: Record<string, string[]> = {};
    terms.forEach(term => {
      results[term] = Array.from(this.index.find(term));
    });
    return results;
  }
}
