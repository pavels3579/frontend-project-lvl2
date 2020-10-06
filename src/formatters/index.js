import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJSON from './json.js';

export default (AST, format) => {
  switch (format) {
    case 'stylish':
      return getStylish(AST);

    case 'plain':
      return getPlain(AST);

    case 'json':
      return getJSON(AST);

    default:
      return getStylish(AST);
  }
};
