import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';
import getContent from '../src/getContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('gendiff', () => {
  let resultFlat;
  let resultTree;

  beforeAll(() => {
    resultFlat = getContent(getFixturePath('result_flat'));
    resultTree = getContent(getFixturePath('result_stylish'));
  });

  test('gendiff tree json, stylish format', () => {
    const pathToFile1 = getFixturePath('before.json');
    const pathToFile2 = getFixturePath('after.json');
    expect(genDiff(pathToFile1, pathToFile2)).toEqual(resultTree);
  });

  test('gendiff flat json, stylish format', () => {
    const pathToFile1 = getFixturePath('before_flat.json');
    const pathToFile2 = getFixturePath('after_flat.json');
    expect(genDiff(pathToFile1, pathToFile2)).toEqual(resultFlat);
  });

  test('gendiff flat yaml, stylish format', () => {
    const pathToFile1 = getFixturePath('before_flat.yml');
    const pathToFile2 = getFixturePath('after_flat.yml');
    expect(genDiff(pathToFile1, pathToFile2)).toEqual(resultFlat);
  });

  test('gendiff flat ini, stylish format', () => {
    const pathToFile1 = getFixturePath('before_flat.ini');
    const pathToFile2 = getFixturePath('after_flat.ini');
    expect(genDiff(pathToFile1, pathToFile2)).toEqual(resultFlat);
  });

  test('gendiff plain format', () => {
    const plain = getContent(getFixturePath('plain'));
    const pathToFile1 = getFixturePath('before.json');
    const pathToFile2 = getFixturePath('after.json');
    expect(genDiff(pathToFile1, pathToFile2, 'plain')).toEqual(plain);
  });

  test('gendiff json format', () => {
    const json = getContent(getFixturePath('json'));
    const pathToFile1 = getFixturePath('before.json');
    const pathToFile2 = getFixturePath('after.json');
    expect(genDiff(pathToFile1, pathToFile2, 'json')).toEqual(json);
  });

  test('gendiff tree ini, stylish format', () => {
    const pathToFile1 = getFixturePath('before.ini');
    const pathToFile2 = getFixturePath('after.ini');
    expect(genDiff(pathToFile1, pathToFile2)).toEqual(resultTree);
  });

  test('gendiff tree yml, stylish format', () => {
    const pathToFile1 = getFixturePath('before.yml');
    const pathToFile2 = getFixturePath('after.yml');
    expect(genDiff(pathToFile1, pathToFile2)).toEqual(resultTree);
  });
});
