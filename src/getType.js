import path from 'path';

const getType = (pathToFile) => {
  switch (path.extname(pathToFile)) {
    case '.json':
      return 'json';

    case '.yml':
      return 'yaml';

    case '.ini':
      return 'ini';

    default:
      return '';
  }
};

export default getType;
