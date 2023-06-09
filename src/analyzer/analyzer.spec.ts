import { Analyzer } from './analyzer';

describe('Analyzer', () => {
  test('should tokenize with whitespace delimiter by default', () => {
    const analyzer = new Analyzer();
    const tokens = analyzer.transform('random words, for random sentence_example');
    expect(tokens).toStrictEqual(['random', 'words,', 'for', 'random', 'sentence_example']);
  });
});
