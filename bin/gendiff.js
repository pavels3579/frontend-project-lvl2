#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<pathToFile1> <pathToFile2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action(
    (pathToFile1, pathToFile2) => {
      console.log(genDiff(pathToFile1, pathToFile2, program.format));
    },
  )
  .parse(process.argv);
