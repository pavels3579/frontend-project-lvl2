import _ from 'lodash';

const getParsing = (obj1, obj2) => {
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);

  const result = keys.reduce((acc, el) => {
    const newObj = {};
    if (_.has(obj1, el)) {
      newObj.before = `${el}: ${obj1[el]}`;
    }

    if (_.has(obj2, el)) {
      newObj.after = `${el}: ${obj2[el]}`;
    }
    acc.push(newObj);

    return acc;
  }, []);

  // console.log('result: ', result);

  return result;
};

export default getParsing;
