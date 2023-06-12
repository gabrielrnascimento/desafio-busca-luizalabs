import { Sorter } from './sorter';

describe('Sorter', () => {
  test('should sort an array in ascending alphabetical order', () => {
    const unsortedMovies = [
      'days-in-the-valley.txt',
      'lead-soldiers.txt',
      'something.txt',
      'arabian-nights.txt',
      'take.txt',
      'minutes-of-hell.txt',
      'the-odyssey.txt'
    ];

    const sortedMovies = [
      'arabian-nights.txt',
      'days-in-the-valley.txt',
      'lead-soldiers.txt',
      'minutes-of-hell.txt',
      'something.txt',
      'take.txt',
      'the-odyssey.txt'
    ];

    const sorter = new Sorter();
    const result = sorter.sort(unsortedMovies);
    expect(result).toStrictEqual(sortedMovies);
  });
});
