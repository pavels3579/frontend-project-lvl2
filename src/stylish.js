import getParsing from './parsers.js';
import os from 'os';

const getStylish = (obj1, obj2) => {
  const data = getParsing(obj1, obj2);
  // console.log('data: ', data);

  const indent = '    ';
  const newLine = os.EOL;
  const res = [];
  const level = 1;

  const getResult = (data, level) => {

    const result = data.reduce((acc, el) => {
      const newIndent = indent.repeat(level);
      const newIndentSign = indent.repeat(level - 1);
      if (el.children.length > 0) {
        if (el.type === 'unchanged') {
          res.push(`${newIndent}${el.name}: {`);
        } else if (el.type === 'changed') {
          res.push(`${newIndentSign}  + ${el.name}: {`);
        } else if (el.type === 'added') {
          res.push(`${newIndentSign}  + ${el.name}: {`);
        } else if (el.type === 'deleted') {
          res.push(`${newIndentSign}  - ${el.name}: {`);
        }


        const temp = getResult(el.children, level + 1);
        // console.log('temp: ', temp);
        return temp;
      }


      if (el.type === 'unchanged') {
        acc.push(`${newIndent}${el.name}: ${el.value[0]}`);
        return acc;
      }

      if (el.type === 'changed') {
        acc.push(`${newIndentSign}  + ${el.name}: ${el.value[1]}`);
        acc.push(`${newIndentSign}  - ${el.name}: ${el.value[0]}`);
        return acc;
      }

      if (el.type === 'added') {
        // console.log('acc1: ', acc);
        acc.push(`${newIndentSign}  + ${el.name}: ${el.value[0]}`);
        return acc;
      }

      if (el.type === 'deleted') {
        acc.push(`${newIndentSign}  - ${el.name}: ${el.value[0]}`);
        return acc;
      }

      return acc;
    }, res);



    // console.log('result: ', result);

    return result;
  };

  const tree = getResult(data, level);
  tree.unshift('{');
  tree.push('}');
  // console.log('tree', tree);


  return tree.join(newLine);

};

export default getStylish;