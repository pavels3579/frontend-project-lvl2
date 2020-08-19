import { test, expect } from '@jest/globals';
import fs from 'fs';
import os from 'os';
import genDiff from '../src/getdiff.js';

let result
let result_tree;
let dirname;

beforeEach(() => {
  // const newLine = '\n';
  const newLine = os.EOL;

  const result0= [
    '{',
    '    host: hexlet.io',
    '  + timeout: 20',
    '  - timeout: 50',
    '  - proxy: 123.234.53.22',
    '  - follow: false',
    '  + verbose: true',
    '}',
  ].join(newLine);

  dirname = `${process.cwd()}/__fixtures__/`;
  // console.log('1', __dirname);

  result = fs.readFileSync(`${dirname}test_result3`, 'utf-8');
  result_tree = fs.readFileSync(`${dirname}test_result`, 'utf-8');
  // const content = fs.readFileSync(filePath, 'utf-8');
  //console.log('result: ', result);
});

test('gendiff json tree', () => {
  const filepath1 = `${dirname}before.json`;
  const filepath2 = `${dirname}after.json`;
  expect(genDiff(filepath1, filepath2)).toEqual(result_tree);
});

test('gendiff json', () => {
  const filepath1 = `${dirname}before2.json`;
  const filepath2 = `${dirname}after2.json`;
  expect(genDiff(filepath1, filepath2)).toEqual(result);
});

test('gendiff yaml', () => {
  const filepath1 = `${dirname}before.yml`;
  const filepath2 = `${dirname}after.yml`;
  expect(genDiff(filepath1, filepath2)).toEqual(result);
});

test('gendiff ini', () => {
  const filepath1 = `${dirname}before.ini`;
  const filepath2 = `${dirname}after.ini`;
  expect(genDiff(filepath1, filepath2)).toEqual(result);
});
