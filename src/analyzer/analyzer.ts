import { type Term } from '../utils/types';

export class Analyzer {
  private sentence!: Term;
  private tokens: Term[];

  constructor () {
    this.tokens = [];
  }

  private tokenize (): void {
    this.tokens.push(...this.sentence.split(/\s+/));
  }

  private lowercase (): void {
    this.tokens = this.tokens.map(token => token.toLowerCase());
  }

  private filter (expression: RegExp): void {
    this.sentence = this.sentence.replace(expression, ' ');
  }

  public transform (sentence: Term, filterExpression?: RegExp): Term[] {
    this.sentence = sentence;
    if (filterExpression) {
      this.filter(filterExpression);
    }
    this.tokenize();
    this.lowercase();
    const result = this.tokens.filter(token => Boolean(token));
    this.tokens = [];
    return result;
  }
}
