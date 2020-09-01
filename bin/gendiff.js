#!/usr/bin/env node
import program from 'commander';
import getDiff from '../src/getdiff.js';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action(
    (filepath1, filepath2) => {
      console.log(getDiff(filepath1, filepath2, program.format));
    },
  )
  .parse(process.argv);
