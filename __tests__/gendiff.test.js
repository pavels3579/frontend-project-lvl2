import { test, expect } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/getdiff.js';

let result;
let resultTree;
let dirname;
let plain;
let json;

beforeEach(() => {
  dirname = `${process.cwd()}/__fixtures__/`;
  // console.log('1', __dirname);

  result = fs.readFileSync(`${dirname}test_result3`, 'utf-8');
  resultTree = fs.readFileSync(`${dirname}test_result`, 'utf-8');
  // console.log('result: ', result);
  plain = fs.readFileSync(`${dirname}plain`, 'utf-8');
  json = fs.readFileSync(`${dirname}json`, 'utf-8');
});

test('gendiff json tree', () => {
  const filepath1 = `${dirname}before.json`;
  const filepath2 = `${dirname}after.json`;
  expect(genDiff(filepath1, filepath2)).toEqual(resultTree);
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

test('gendiff plain format', () => {
  const filepath1 = `${dirname}before.json`;
  const filepath2 = `${dirname}after.json`;
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plain);
});

test('gendiff json format', () => {
  const filepath1 = `${dirname}before.json`;
  const filepath2 = `${dirname}after.json`;
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(json);
});
