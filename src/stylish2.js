import getParsing from './parsers.js';
import os from 'os';

const getStylish = (obj1, obj2) => {
  // console.log('eol: ', os.EOL);
  const data = getParsing(obj1, obj2);

  const indent = '  ';
  //const newLine = '\r\n';
  const newLine = os.EOL;

  const result = data.reduce((acc, e) => {
    // if (e instanceof Array) {

    // }


    if (e.after === e.before) {
      acc.push(`${indent}${indent}${e.after}`);
      return acc;
    }

    if (e.after !== undefined) {
      acc.push(`  + ${e.after}`);
    }

    if (e.before !== undefined) {
      acc.push(`  - ${e.before}`);
    }

    if (e instanceof Object) {
      for (const k in e) {
        acc.push(`  ++ ${k}`);
      }
    }

    return acc;
  }, []);

  result.unshift('{');
  result.push('}');
  //result.push(`}`);
  // result.push(newLine);

  //console.log('res: ', result.join(newLine));

  const str = result.join(newLine);
  return str;
};

export default getStylish;
