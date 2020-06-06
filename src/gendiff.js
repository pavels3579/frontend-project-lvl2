// const program = require('commander');
import program from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const gendiff = () => {
  program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => {
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

      for (const prop of keys) {
        if (_.has(obj2, prop) && _.has(obj1, prop)) {
          if (obj2[prop] === obj1[prop]) {
            result = `${result}    ${prop}: ${obj1[prop]}${newLine}`;
          } else {
            result = `${result}  + ${prop}: ${obj2[prop]}${newLine}`;
            result = `${result}  - ${prop}: ${obj1[prop]}${newLine}`;
          }
        } else if (_.has(obj2, prop)) {
          result = `${result}  + ${prop}: ${obj2[prop]}${newLine}`;
        } else {
          result = `${result}  - ${prop}: ${obj1[prop]}${newLine}`;
        }
      }
      result = `${result}}`;

      console.log(result);

      return result;
    });

  program.parse(process.argv);
};

export default gendiff;
