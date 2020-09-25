import path from 'path';

const getType = (pathToFile) => {
  if (path.extname(pathToFile) === '.json') {
    return 'json';
  }

  if (path.extname(pathToFile) === '.yml') {
    return 'yaml';
  }

  if (path.extname(pathToFile) === '.ini') {
    return 'ini';
  }

  return '';
};

export default getType;
