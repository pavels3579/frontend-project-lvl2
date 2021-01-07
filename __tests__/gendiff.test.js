import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';
import getContent from '../src/getContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const formats = [
  ['json', 'stylish'], ['ini', 'stylish'], ['yml', 'stylish'],
  ['json', 'plain'], ['ini', 'plain'], ['yml', 'plain'],
  ['json', 'json'], ['ini', 'json'], ['yml', 'json'],
];
const fileNames = formats.map((el) => [`${el[1]}`, `${el[0]}`, getFixturePath(`before.${el[0]}`), getFixturePath(`after.${el[0]}`)]);

describe('gendiff', () => {
  const getResult = (format) => getContent(getFixturePath(format));

  test.each(fileNames)('gendiff %s, %s format)', (format, type, pathToFile1, pathToFile2) => {
    expect(genDiff(pathToFile1, pathToFile2, format)).toEqual(getResult(format));
  });
});
