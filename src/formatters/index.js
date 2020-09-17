import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJSON from './json.js';

export default (data1, data2, format) => {
  if (format === 'stylish') {
    return getStylish(data1, data2);
  }

  if (format === 'plain') {
    return getPlain(data1, data2);
  }

  if (format === 'json') {
    return getJSON(data1, data2);
  }

  return getStylish(data1, data2);
};
