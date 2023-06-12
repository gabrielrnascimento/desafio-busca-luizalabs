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

  test('should sort an array in ascending numerical order', () => {
    const unsortedMovies = [
      '2-days-in-the-valley.txt',
      '13-lead-soldiers.txt',
      '1-something.txt',
      '1001-arabian-nights.txt',
      '2nd-take.txt',
      '40-minutes-of-hell.txt',
      '2012-the-odyssey.txt'
    ];

    const sortedMovies = [
      '1-something.txt',
      '2-days-in-the-valley.txt',
      '2nd-take.txt',
      '13-lead-soldiers.txt',
      '40-minutes-of-hell.txt',
      '1001-arabian-nights.txt',
      '2012-the-odyssey.txt'
    ];

    const sorter = new Sorter();
    const result = sorter.sort(unsortedMovies);
    expect(result).toStrictEqual(sortedMovies);
  });

  test('should sort an array with empty strings and repeated items in ascending order', () => {
    const unsortedMovies = [
      '2-days-in-the-valley.txt',
      '13-lead-soldiers.txt',
      '1-something.txt',
      '1-something.txt',
      '1001-arabian-nights.txt',
      '2nd-take.txt',
      '',
      '40-minutes-of-hell.txt',
      '2012-the-odyssey.txt'
    ];

    const sortedMovies = [
      '',
      '1-something.txt',
      '1-something.txt',
      '2-days-in-the-valley.txt',
      '2nd-take.txt',
      '13-lead-soldiers.txt',
      '40-minutes-of-hell.txt',
      '1001-arabian-nights.txt',
      '2012-the-odyssey.txt'
    ];

    const sorter = new Sorter();
    const result = sorter.sort(unsortedMovies);
    expect(result).toStrictEqual(sortedMovies);
  });
});
