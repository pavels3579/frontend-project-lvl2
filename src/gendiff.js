// const program = require('commander');
import program from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getdiff = (filepath1, filepath2) => {
  let result = '';
  const workingDirectory = process.cwd();
  const newLine = '\r\n';

  if (!filepath1.includes(workingDirectory)) {
    filepath1 = path.resolve(workingDirectory, filepath1);
  }

  if (!filepath2.includes(workingDirectory)) {
    filepath2 = path.resolve(workingDirectory, filepath2);
  }

  const json1 = fs.readFileSync(filepath1);
  const obj1 = JSON.parse(json1);
  const json2 = fs.readFileSync(filepath2);
  const obj2 = JSON.parse(json2);
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);

  result = `{${newLine}`;

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
