import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import getContent from '../src/getContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let resultFlat;
let resultTree;

beforeAll(() => {
  resultFlat = getContent(getFixturePath('result_flat'));
  resultTree = getContent(getFixturePath('result_stylish'));
});

test('gendiff tree json, stylish format', () => {
  const filepath1 = getFixturePath('before.json');
  const filepath2 = getFixturePath('after.json');
  expect(genDiff(filepath1, filepath2)).toEqual(resultTree);
});

test('gendiff flat json, stylish format', () => {
  const filepath1 = getFixturePath('before_flat.json');
  const filepath2 = getFixturePath('after_flat.json');
  expect(genDiff(filepath1, filepath2)).toEqual(resultFlat);
});

test('gendiff flat yaml, stylish format', () => {
  const filepath1 = getFixturePath('before_flat.yml');
  const filepath2 = getFixturePath('after_flat.yml');
  expect(genDiff(filepath1, filepath2)).toEqual(resultFlat);
});

test('gendiff flat ini, stylish format', () => {
  const filepath1 = getFixturePath('before_flat.ini');
  const filepath2 = getFixturePath('after_flat.ini');
  expect(genDiff(filepath1, filepath2)).toEqual(resultFlat);
});

test('gendiff plain format', () => {
  const plain = getContent(getFixturePath('plain'));
  const filepath1 = getFixturePath('before.json');
  const filepath2 = getFixturePath('after.json');
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plain);
});

test('gendiff json format', () => {
  const json = getContent(getFixturePath('json'));
  const filepath1 = getFixturePath('before.json');
  const filepath2 = getFixturePath('after.json');
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(json);
});

test('gendiff tree ini, stylish format', () => {
  const filepath1 = getFixturePath('before.ini');
  const filepath2 = getFixturePath('after.ini');
  expect(genDiff(filepath1, filepath2)).toEqual(resultTree);
});

test('gendiff tree yml, stylish format', () => {
  const filepath1 = getFixturePath('before.yml');
  const filepath2 = getFixturePath('after.yml');
  expect(genDiff(filepath1, filepath2)).toEqual(resultTree);
});
