import { test, expect } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/getdiff.js';

let resultFlat;
let resultTree;
let dirname;
let plain;
let json;

beforeEach(() => {
  dirname = `${process.cwd()}/__fixtures__/`;

  resultFlat = fs.readFileSync(`${dirname}result_flat`, 'utf-8');
  resultTree = fs.readFileSync(`${dirname}result_stylish`, 'utf-8');
  plain = fs.readFileSync(`${dirname}plain`, 'utf-8');
  json = fs.readFileSync(`${dirname}json`, 'utf-8');
});

test('gendiff tree json, stylish format', () => {
  const filepath1 = `${dirname}before.json`;
  const filepath2 = `${dirname}after.json`;
  expect(genDiff(filepath1, filepath2)).toEqual(resultTree);
});

test('gendiff flat json, stylish format', () => {
  const filepath1 = `${dirname}before_flat.json`;
  const filepath2 = `${dirname}after_flat.json`;
  expect(genDiff(filepath1, filepath2)).toEqual(resultFlat);
});

test('gendiff flat yaml, stylish format', () => {
  const filepath1 = `${dirname}before_flat.yml`;
  const filepath2 = `${dirname}after_flat.yml`;
  expect(genDiff(filepath1, filepath2)).toEqual(resultFlat);
});

test('gendiff flat ini, stylish format', () => {
  const filepath1 = `${dirname}before_flat.ini`;
  const filepath2 = `${dirname}after_flat.ini`;
  expect(genDiff(filepath1, filepath2)).toEqual(resultFlat);
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

test('gendiff tree ini, stylish format', () => {
  const filepath1 = `${dirname}before.ini`;
  const filepath2 = `${dirname}after.ini`;
  expect(genDiff(filepath1, filepath2)).toEqual(resultTree);
});

test('gendiff tree yml, stylish format', () => {
  const filepath1 = `${dirname}before.yml`;
  const filepath2 = `${dirname}after.yml`;
  expect(genDiff(filepath1, filepath2)).toEqual(resultTree);
});
