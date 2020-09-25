import yaml from 'js-yaml';
import ini from 'ini';
import getContent from './getContent.js';

const getData = (pathToFile, type) => {
  const content = getContent(pathToFile);

  switch (type) {
    case 'json':
      return JSON.parse(content);

    case 'yaml':
      return yaml.safeLoad(content);

    case 'ini':
      return ini.parse(content);

    default:
      throw new Error('Unknown file format.');
  }
};

export default getData;
