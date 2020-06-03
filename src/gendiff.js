// const program = require('commander');
import program from 'commander';

const gendiff = () => {
  program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .parse(process.argv);
};

export default gendiff;
