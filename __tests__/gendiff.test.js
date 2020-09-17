import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';
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
  const filePath1 = getFixturePath('before.json');
  const filePath2 = getFixturePath('after.json');
  expect(genDiff(filePath1, filePath2)).toEqual(resultTree);
});

test('gendiff flat json, stylish format', () => {
  const filePath1 = getFixturePath('before_flat.json');
  const filePath2 = getFixturePath('after_flat.json');
  expect(genDiff(filePath1, filePath2)).toEqual(resultFlat);
});

test('gendiff flat yaml, stylish format', () => {
  const filePath1 = getFixturePath('before_flat.yml');
  const filePath2 = getFixturePath('after_flat.yml');
  expect(genDiff(filePath1, filePath2)).toEqual(resultFlat);
});

test('gendiff flat ini, stylish format', () => {
  const filePath1 = getFixturePath('before_flat.ini');
  const filePath2 = getFixturePath('after_flat.ini');
  expect(genDiff(filePath1, filePath2)).toEqual(resultFlat);
});

test('gendiff plain format', () => {
  const plain = getContent(getFixturePath('plain'));
  const filePath1 = getFixturePath('before.json');
  const filePath2 = getFixturePath('after.json');
  expect(genDiff(filePath1, filePath2, 'plain')).toEqual(plain);
});

test('gendiff json format', () => {
  const json = getContent(getFixturePath('json'));
  const filePath1 = getFixturePath('before.json');
  const filePath2 = getFixturePath('after.json');
  expect(genDiff(filePath1, filePath2, 'json')).toEqual(json);
});

test('gendiff tree ini, stylish format', () => {
  const filePath1 = getFixturePath('before.ini');
  const filePath2 = getFixturePath('after.ini');
  expect(genDiff(filePath1, filePath2)).toEqual(resultTree);
});

test('gendiff tree yml, stylish format', () => {
  const filePath1 = getFixturePath('before.yml');
  const filePath2 = getFixturePath('after.yml');
  expect(genDiff(filePath1, filePath2)).toEqual(resultTree);
});
