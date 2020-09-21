import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJSON from './json.js';

export default (AST, format) => {
  if (format === 'stylish') {
    return getStylish(AST);
  }

  if (format === 'plain') {
    return getPlain(AST);
  }

  if (format === 'json') {
    return getJSON(AST);
  }

  return getStylish(AST);
};
