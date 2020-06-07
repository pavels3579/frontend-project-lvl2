import { test, expect } from '@jest/globals';
import gendiff from '../src/gendiff.js';

test('gendiff', () => {
  const result = '{\r\n\
    host: hexlet.io\r\n\
  + timeout: 20\r\n\
  - timeout: 50\r\n\
  - proxy: 123.234.53.22\r\n\
  - follow: false\r\n\
  + verbose: true\r\n\
}';

  expect(gendiff('fixtures/before.json', 'fixtures/after.json')).toEqual(result);
  // expect(gendiff('')).toEqual('');
});
