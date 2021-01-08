import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';
import getContent from '../src/getContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const formats = ['json', 'ini', 'yml'];

describe('gendiff', () => {
  const getResult = (format) => getContent(getFixturePath(format));

  test.each(formats)('gendiff %s format', (format) => {
    const pathToFile1 = getFixturePath(`before.${format}`);
    const pathToFile2 = getFixturePath(`after.${format}`);
    expect(genDiff(pathToFile1, pathToFile2)).toEqual(getResult('stylish'));
    expect(genDiff(pathToFile1, pathToFile2, 'plain')).toEqual(getResult('plain'));
    expect(genDiff(pathToFile1, pathToFile2, 'json')).toEqual(getResult('json'));
  });
});
