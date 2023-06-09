import { Analyzer } from './analyzer';

describe('Analyzer', () => {
  test('should tokenize with whitespace delimiter by default', () => {
    const analyzer = new Analyzer();
    const tokens = analyzer.transform('random words, for random sentence_example');
    expect(tokens).toStrictEqual(['random', 'words,', 'for', 'random', 'sentence_example']);
  });

  test('should tokenize using RegExp expression if passed', () => {
    const analyzer = new Analyzer();
    const expression = /\W+|_/;
    const tokens = analyzer.transform('random words, for random sentence_example', expression);
    expect(tokens).toStrictEqual(['random', 'words', 'for', 'random', 'sentence', 'example']);
  });

  test('should lowercase tokens', () => {
    const analyzer = new Analyzer();
    const tokens = analyzer.transform('random Words foR RANDOM sentEnce eXample');
    expect(tokens).toStrictEqual(['random', 'words', 'for', 'random', 'sentence', 'example']);
  });
});
