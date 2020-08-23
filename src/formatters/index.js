import getStylish from './stylish.js';
import getPlain from './plain.js';

export default (obj1, obj2, format) => {
  if (format === 'stylish') {
    return getStylish(obj1, obj2);
  } else if (format === 'plain') {
    return getPlain(obj1, obj2);
  }
};

