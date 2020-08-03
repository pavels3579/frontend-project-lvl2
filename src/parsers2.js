import _ from 'lodash';

const getParsing = (obj1, obj2) => {
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);

  const buijdObject = (obj, key, value) => {
    obj[key] = value;
  };

  const getAST = (arr, objKeys, o1 = {}, o2 = {}) => {
    return objKeys.reduce((acc, e) => {
      const newObj = {};

      if (o1[e] instanceof Object && o2[e] instanceof Object && 1 === 0) {
        // console.log('111');
        newObj.obj = o1[e];
        acc.push(newObj);
        return getAST(acc, _.uniq([...Object.keys(o1[e]), ...Object.keys(o2[e])]), o1[e], o2[e]);
      } else if (o1[e] instanceof Object  && 1 === 0) {
        // console.log('111');
        newObj.obj = o1[e];
        acc.push(newObj);
        return getAST(acc, _.uniq([...Object.keys(o1[e])]), o1[e]);
      } else if (o2[e] instanceof Object  && 1 === 0) {
        // console.log('111');
        newObj.obj = o2[e];
        acc.push(newObj);
        return getAST(acc, _.uniq([...Object.keys(o2[e])]), {}, o2[e]);
      }

      if (_.has(o1, e)) {
        // newObj.obj = {};
        newObj.before = `${e}: ${o1[e]}`;
      }

      if (_.has(o2, e)) {
        // newObj.obj = {};
        newObj.after = `${e}: ${o2[e]}`;
      }

      if (o1[e] instanceof Object) {
        buijdObject(newObj, 'before', ...Object.keys(o1[e]));
      }

      acc.push(newObj);

      return acc;
    }, arr);
  }

  const result = getAST([], keys, obj1, obj2);

  console.log('result ast: ', result);

  return result;
};

export default getParsing;
