import { Analyzer } from './analyzer';

describe('Analyzer', () => {
  test('should tokenize with whitespace delimiter by default', () => {
    const analyzer = new Analyzer();
    const tokens = analyzer.transform('random words, for random sentence_example');
    expect(tokens).toStrictEqual(['random', 'words,', 'for', 'random', 'sentence_example']);
  });

  test('should filter characters using RegExp expression if passed', () => {
    const analyzer = new Analyzer();
    const filterExpression = /[^\w\s-]|[-_]/g;
    const tokens = analyzer.transform('random? words, for: random-sentence! another_word example.', filterExpression);
    expect(tokens).toStrictEqual(['random', 'words', 'for', 'random', 'sentence', 'another', 'word', 'example']);
  });

  test('should lowercase tokens', () => {
    const analyzer = new Analyzer();
    const tokens = analyzer.transform('random Words foR RANDOM sentEnce eXample');
    expect(tokens).toStrictEqual(['random', 'words', 'for', 'random', 'sentence', 'example']);
  });
});
