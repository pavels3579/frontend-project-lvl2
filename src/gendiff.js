// const program = require('commander');
import program from 'commander';

const gendiff = () => {
  program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);
};

export default gendiff;
