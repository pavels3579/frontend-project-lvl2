#!/usr/bin/env node
import commander from 'commander';
import getDiff from '../src/getdiff.js';

const program = commander.createCommand();

const genDiff = program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action(
    (filepath1, filepath2) => {
      // console.log('ff: ', program.format);
      console.log(getDiff(filepath1, filepath2, program.format));
    },
  );

program.parse(process.argv);

export default genDiff;
