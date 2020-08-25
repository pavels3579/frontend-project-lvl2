import os from 'os';
import getParsing from '../parsers.js';

const addObject = (obj, res, level) => {
  const indent = '    ';
  const newIndent = indent.repeat(level);
  const newIndentAndSign = indent.repeat(level - 1);

  const keys = Object.keys(obj);

  const result = keys.reduce((acc, el) => {
    if (obj[el] instanceof Object) {
      acc.push(`{'name': ${el}},`);
      // acc.push(`${newIndent}${el}: {`);
      return addObject(obj[el], acc, level + 1);
    }

    // acc.push(`${newIndent}${el}: ${obj[el]}`);
    // acc.push(`${newIndentAndSign}}`);

    acc.push(`{'name': ${el}},`);
    acc.push(`{'value': ${obj[el]}}`);

    return acc;
  }, res);

  return result;
};

const getJSON = (obj1, obj2) => {
  const startData = getParsing(obj1, obj2);
  // console.log('data: ', data);

  const indent = '    ';
  const newLine = os.EOL;
  const res = [];
  const startLevel = 1;

  const getResult = (data, level) => {
    const result = data.reduce((acc, el) => {
      const newIndent = indent.repeat(level);
      const newIndentAndSign = indent.repeat(level - 1);
      if (el.children.length) {
        acc.push(`{'name': ${el.name}},`);
        acc.push(`{'type': ${el.type}},`);
        acc.push(`{'children': [`);

        const temp = getResult(el.children, level + 1);
        temp.push(']},');
        // console.log('temp: ', temp);
        return temp;
      }

      if (el.value[0] instanceof Object) {
        acc.push(`{'name': ${el.name}},`);
        acc.push(`{'type': ${el.type}},`);

        if (el.type === 'unchanged') {
          // acc.push(`${newIndent}${el.name}: {`);
          // acc.push(`{'value': ${el.value[0]}},`);
        } else if (el.type === 'changed') {
          // acc.push(`${newIndentAndSign}  - ${el.name}: {`);
          acc.push(`{'valuebefore': {`);
        } else if (el.type === 'deleted') {
          // acc.push(`${newIndentAndSign}  - ${el.name}: {`);
          acc.push(`{'value': {`);
        } else if (el.type === 'added') {
          // acc.push(`${newIndentAndSign}  + ${el.name}: {`);
          // acc.push(`{'value': ${el.value[0]}},`);
          acc.push(`{'value': {`);
        }

        const temp = addObject(el.value[0], acc, level + 1);
        if (el.type === 'changed') {
          // temp.push(`${newIndentAndSign}  + ${el.name}: ${el.value[1]}`);
          acc.push(`}, {'valueafter': ${el.value[1]},`);
        } else {
          acc.push(`},`);
        }

        return temp;
      }

      if (el.value[1] instanceof Object) {
        acc.push(`{'name': ${el.name}},`);
        acc.push(`{'type': ${el.type}},`);

        if (el.type === 'unchanged') {
          // acc.push(`${newIndent}${el.name}: {`);
          // acc.push(`{'value': ${el.value[1]}},`);
        } else if (el.type === 'changed') {
          // acc.push(`${newIndentAndSign}  - ${el.name}: ${el.value[0]}`);
          // acc.push(`${newIndentAndSign}  + ${el.name}: {`);
          acc.push(`{'valuebefore': ${el.value[0]}},`);
          // acc.push(`{'valueafter': ${el.value[1]}},`);
          acc.push(`{'valueafter': {`);
        } else if (el.type === 'deleted') {
          // acc.push(`${newIndentAndSign}  - ${el.name}: {`);
          // acc.push(`{'value': ${el.value[1]}},`);
        } else if (el.type === 'added') {
          // acc.push(`${newIndentAndSign}  + ${el.name}: {`);
          // acc.push(`{'value': ${el.value[1]}},`);
        }

        const temp = addObject(el.value[1], acc, level + 1);

        if (el.type === 'changed') {
          // temp.push(`${newIndentAndSign}  + ${el.name}: ${el.value[1]}`);
          acc.push(`},`);
        }

        return temp;
      }

      acc.push(`{'name': ${el.name}},`);
      acc.push(`{'type': ${el.type}},`);

      if (el.type === 'unchanged') {
        // acc.push(`${newIndent}${el.name}: ${el.value[0]}`);
        acc.push(`{'value': ${el.value[0]}},`);
        return acc;
      }

      if (el.type === 'changed') {
        // acc.push(`${newIndentAndSign}  - ${el.name}: ${el.value[0]}`);
        // acc.push(`${newIndentAndSign}  + ${el.name}: ${el.value[1]}`);
        acc.push(`{'valuebefore': ${el.value[0]}},`);
        acc.push(`{'valueafter': ${el.value[1]}},`);
        return acc;
      }

      if (el.type === 'deleted') {
        // acc.push(`${newIndentAndSign}  - ${el.name}: ${el.value[0]}`);
        acc.push(`{'value': ${el.value[0]}},`);
        return acc;
      }

      if (el.type === 'added') {
        // console.log('acc1: ', acc);
        // acc.push(`${newIndentAndSign}  + ${el.name}: ${el.value[0]}`);
        acc.push(`{'value': ${el.value[0]}},`);
        return acc;
      }

      return acc;
    }, res);

    // console.log('result: ', result);

    return result;
  };

  const tree = getResult(startData, startLevel);
  // console.log('tree', tree);
  // tree.unshift('{');
  // tree.push('}');
  console.log('tree', tree);

  // return tree.join(newLine);
  const r = tree.join('');
  const r1 = r.split('');
  r1.pop();
  const r2 = r1.join('');
  console.log('r2', r2);
  return r2;
};

export default getJSON;
