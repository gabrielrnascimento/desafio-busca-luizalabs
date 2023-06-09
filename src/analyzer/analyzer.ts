export class Analyzer {
  private sentence!: string;
  private tokens: string[];

  constructor () {
    this.tokens = [];
  }

  private tokenize (expression: RegExp = /\s+/): void {
    this.tokens.push(...this.sentence.split(expression));
  }

  public transform (sentence: string, delimiterExpression?: RegExp): string[] {
    this.sentence = sentence;
    this.tokenize(delimiterExpression);
    const result = this.tokens;
    this.tokens = [];
    return result;
  }
}
