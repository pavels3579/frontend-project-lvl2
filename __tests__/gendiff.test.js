import { test, expect } from '@jest/globals';
import getdiff from '../src/getdiff.js';

test('gendiff', () => {
  const result = '{\r\n\
    host: hexlet.io\r\n\
  + timeout: 20\r\n\
  - timeout: 50\r\n\
  - proxy: 123.234.53.22\r\n\
  - follow: false\r\n\
  + verbose: true\r\n\
}';

  const dirname = process.cwd();
  // console.log('1', __dirname);

  const filepath1 = `${dirname}/__fixtures__/before.json`;
  const filepath2 = `${dirname}/__fixtures__/after.json`;
  expect(getdiff(filepath1, filepath2)).toEqual(result);
});
