import getParsing from '../parsers.js';

const addObject = (obj, res) => {
  const keys = Object.keys(obj);

  const result = keys.reduce((acc, el) => {
    if (obj[el] instanceof Object) {
      acc.push(`{'name': ${el}},`);

      return addObject(obj[el], acc);
    }

    acc.push(`{'name': ${el}},`);
    acc.push(`{'value': ${obj[el]}}`);

    return acc;
  }, res);

  return result;
};

const getJSON = (obj1, obj2) => {
  const startData = getParsing(obj1, obj2);
  const res = [];

  const getResult = (data) => {
    const result = data.reduce((acc, el) => {
      if (el.children.length) {
        acc.push(`{'name': ${el.name}},`);
        acc.push(`{'type': ${el.type}},`);
        acc.push("{'children': [");

        const temp = getResult(el.children);
        temp.push(']},');

        return temp;
      }

      if (el.value[0] instanceof Object) {
        acc.push(`{'name': ${el.name}},`);
        acc.push(`{'type': ${el.type}},`);

        if (el.type === 'changed') {
          acc.push("{'valuebefore': {");
        } else if (el.type === 'deleted') {
          acc.push("{'value': {");
        } else if (el.type === 'added') {
          acc.push("{'value': {");
        }

        const temp = addObject(el.value[0], acc);
        if (el.type === 'changed') {
          acc.push(`}, {'valueafter': ${el.value[1]},`);
        } else {
          acc.push('},');
        }

        return temp;
      }

      if (el.value[1] instanceof Object) {
        acc.push(`{'name': ${el.name}},`);
        acc.push(`{'type': ${el.type}},`);

        if (el.type === 'changed') {
          acc.push(`{'valuebefore': ${el.value[0]}},`);
          acc.push("{'valueafter': {");
        }

        const temp = addObject(el.value[1], acc);

        if (el.type === 'changed') {
          acc.push('},');
        }

        return temp;
      }

      acc.push(`{'name': ${el.name}},`);
      acc.push(`{'type': ${el.type}},`);

      if (el.type === 'unchanged') {
        acc.push(`{'value': ${el.value[0]}},`);
        return acc;
      }

      if (el.type === 'changed') {
        acc.push(`{'valuebefore': ${el.value[0]}},`);
        acc.push(`{'valueafter': ${el.value[1]}},`);
        return acc;
      }

      if (el.type === 'deleted') {
        acc.push(`{'value': ${el.value[0]}},`);
        return acc;
      }

      if (el.type === 'added') {
        acc.push(`{'value': ${el.value[0]}},`);
        return acc;
      }

      return acc;
    }, res);

    return result;
  };

  const tree = getResult(startData);

  const tempResult = tree.join('').split('');
  tempResult.pop();
  return tempResult.join('');
};

export default getJSON;