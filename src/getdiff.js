// const program = require('commander');
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getpath = (filePath) => {
  const workingDirectory = process.cwd();
  let correctPath = filePath;

  if (!correctPath.includes(workingDirectory)) {
    correctPath = path.resolve(workingDirectory, correctPath);
  }

  return correctPath;
};

const getdiff = (filepath1, filepath2) => {
  const newLine = '\r\n';
  const path1 = getpath(filepath1);
  const path2 = getpath(filepath2);
  const json1 = fs.readFileSync(path1);
  const obj1 = JSON.parse(json1);
  const json2 = fs.readFileSync(path2);
  const obj2 = JSON.parse(json2);
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);
  const result = ['{'];

  for (let i = 0; i < keys.length; i += 1) {
    if (_.has(obj2, keys[i]) && _.has(obj1, keys[i])) {
      if (obj2[keys[i]] === obj1[keys[i]]) {
        result.push(`    ${keys[i]}: ${obj1[keys[i]]}`);
      } else {
        result.push(`  + ${keys[i]}: ${obj2[keys[i]]}`);
        result.push(`  - ${keys[i]}: ${obj1[keys[i]]}`);
      }
    } else if (_.has(obj2, keys[i])) {
      result.push(`  + ${keys[i]}: ${obj2[keys[i]]}`);
    } else {
      result.push(`  - ${keys[i]}: ${obj1[keys[i]]}`);
    }
  }
  result.push('}');
  return result.join(newLine);
};

export default getdiff;
