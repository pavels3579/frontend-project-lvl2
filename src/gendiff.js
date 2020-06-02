// const program = require('commander');

const gendiff = () => {
  const {program} = require('commander');

  program
    .version('0.1.0')
    .parse(process.argv);
};

export default gendiff;
