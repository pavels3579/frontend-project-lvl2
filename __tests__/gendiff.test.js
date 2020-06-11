import { test, expect } from '@jest/globals';
import genDiff from '../src/getdiff.js';

let result;
let dirname;

beforeEach(() => {
  const newLine = '\r\n';
  result = [
    '{',
    '    host: hexlet.io',
    '  + timeout: 20',
    '  - timeout: 50',
    '  - proxy: 123.234.53.22',
    '  - follow: false',
    '  + verbose: true',
    '}',
  ].join(newLine);

  dirname = process.cwd();
  // console.log('1', __dirname);
});

test('gendiff json', () => {
  const filepath1 = `${dirname}/__fixtures__/before.json`;
  const filepath2 = `${dirname}/__fixtures__/after.json`;
  expect(genDiff(filepath1, filepath2)).toEqual(result);
});

test('gendiff yaml', () => {
  const filepath1 = `${dirname}/__fixtures__/before.yml`;
  const filepath2 = `${dirname}/__fixtures__/after.yml`;
  expect(genDiff(filepath1, filepath2)).toEqual(result);
});
