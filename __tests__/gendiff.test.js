import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';
import getContent from '../src/getContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const formats = ['json', 'ini', 'yml'];
const fileNamesTree = formats.map((el) => [`${el}`, getFixturePath(`before.${el}`), getFixturePath(`after.${el}`)]);
const fileNamesFlat = formats.map((el) => [`${el}`, getFixturePath(`before_flat.${el}`), getFixturePath(`after_flat.${el}`)]);

describe('gendiff', () => {
  const plain = getContent(getFixturePath('plain'));
  const json = getContent(getFixturePath('json'));

  let resultFlat;
  let resultTree;

  beforeAll(() => {
    resultFlat = getContent(getFixturePath('result_flat'));
    resultTree = getContent(getFixturePath('result_stylish'));
  });

  test.each(fileNamesTree)('gendiff tree %s, stylish format)', (format, pathToFile1, pathToFile2) => {
    expect(genDiff(pathToFile1, pathToFile2)).toEqual(resultTree);
  });

  test.each(fileNamesFlat)('gendiff flat %s, stylish format)', (format, pathToFile1, pathToFile2) => {
    expect(genDiff(pathToFile1, pathToFile2)).toEqual(resultFlat);
  });

  test.each(fileNamesTree)('gendiff tree %s, plain format)', (format, pathToFile1, pathToFile2) => {
    expect(genDiff(pathToFile1, pathToFile2, 'plain')).toEqual(plain);
  });

  test.each(fileNamesTree)('gendiff tree %s, json format)', (format, pathToFile1, pathToFile2) => {
    expect(genDiff(pathToFile1, pathToFile2, 'json')).toEqual(json);
  });
});
