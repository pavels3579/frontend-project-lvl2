import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';
import getContent from '../src/getContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const formats = ['json', 'ini', 'yml'];
const fileNames = formats.map((el) => [`${el}`, getFixturePath(`before.${el}`), getFixturePath(`after.${el}`)]);

describe('gendiff', () => {
  const resultStylish = getContent(getFixturePath('result_stylish'));
  const resultPlain = getContent(getFixturePath('plain'));
  const resultJson = getContent(getFixturePath('json'));

  test.each(fileNames)('gendiff tree %s, stylish format)', (format, pathToFile1, pathToFile2) => {
    expect(genDiff(pathToFile1, pathToFile2)).toEqual(resultStylish);
  });

  test.each(fileNames)('gendiff tree %s, plain format)', (format, pathToFile1, pathToFile2) => {
    expect(genDiff(pathToFile1, pathToFile2, 'plain')).toEqual(resultPlain);
  });

  test.each(fileNames)('gendiff tree %s, json format)', (format, pathToFile1, pathToFile2) => {
    expect(genDiff(pathToFile1, pathToFile2, 'json')).toEqual(resultJson);
  });
});
