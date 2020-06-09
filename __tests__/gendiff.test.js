import { test, expect } from '@jest/globals';
import getdiff from '../src/getdiff.js';

test('gendiff', () => {
  const result = [
    '{',
    '    host: hexlet.io',
    '  + timeout: 20',
    '  - timeout: 50',
    '  - proxy: 123.234.53.22',
    '  - follow: false',
    '  + verbose: true',
    '}',
  ];

  const dirname = process.cwd();
  // console.log('1', __dirname);
  const newLine = '\r\n';

  const filepath1 = `${dirname}/__fixtures__/before.json`;
  const filepath2 = `${dirname}/__fixtures__/after.json`;
  expect(getdiff(filepath1, filepath2)).toEqual(result.join(newLine));
});
