import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJSON from './json.js';

export default (obj1, obj2, format) => {
  if (format === 'stylish') {
    return getStylish(obj1, obj2);
  }

  if (format === 'plain') {
    return getPlain(obj1, obj2);
  }

  if (format === 'json') {
    return getJSON(obj1, obj2);
  }

  return getStylish(obj1, obj2);
};
