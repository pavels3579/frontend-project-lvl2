#!/usr/bin/env node
import commander from 'commander';
import getdiff from '../src/getdiff.js';

const program = commander.createCommand();

const gendiff = program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    getdiff(filepath1, filepath2);
  });

program.parse(process.argv);

// console.log(diff);
export default gendiff;
