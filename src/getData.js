import yaml from 'js-yaml';
import ini from 'ini';
import getContent from './getContent.js';

const getData = (pathToFile, type) => {
  const content = getContent(pathToFile);

  if (type === 'json') {
    return JSON.parse(content);
  }

  if (type === 'yaml') {
    return yaml.safeLoad(content);
  }

  if (type === 'ini') {
    return ini.parse(content);
  }

  throw new Error('Unknown file format.');
};

export default getData;
