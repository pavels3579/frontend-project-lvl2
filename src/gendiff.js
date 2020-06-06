// const program = require('commander');
import program from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getdiff = (filepath1, filepath2) => {
  let result = '';
  let path1 = filepath1;
  let path2 = filepath2;
  const workingDirectory = process.cwd();
  const newLine = '\r\n';

  if (!path1.includes(workingDirectory)) {
    path1 = path.resolve(workingDirectory, path1);
  }

  if (!path2.includes(workingDirectory)) {
    path2 = path.resolve(workingDirectory, path2);
  }

  const json1 = fs.readFileSync(path1);
  const obj1 = JSON.parse(json1);

  const json2 = fs.readFileSync(path.resolve(process.cwd(), filepath2));
  const obj2 = JSON.parse(json2);

  result = `{${newLine}`;

  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (let i = 0; i < keys.length; i += 1) {
    if (_.has(obj2, keys[i]) && _.has(obj1, keys[i])) {
      if (obj2[keys[i]] === obj1[keys[i]]) {
        result = `${result}    ${keys[i]}: ${obj1[keys[i]]}${newLine}`;
      } else {
        result = `${result}  + ${keys[i]}: ${obj2[keys[i]]}${newLine}`;
        result = `${result}  - ${keys[i]}: ${obj1[keys[i]]}${newLine}`;
      }
    } else if (_.has(obj2, keys[i])) {
      result = `${result}  + ${keys[i]}: ${obj2[keys[i]]}${newLine}`;
    } else {
      result = `${result}  - ${keys[i]}: ${obj1[keys[i]]}${newLine}`;
    }
  }
  result = `${result}}`;
  // console.log(result);
  return result;
};

const gendiff = () => {
  program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => {
      getdiff(filepath1, filepath2);
    });

  program.parse(process.argv);
};

export default gendiff;
