import _ from 'lodash';
import ini from 'ini';
import yaml from 'js-yaml';

const parseIni = (iniObj) => {
  const iter = (value) => {
    if (!_.isPlainObject(value)) {
      return parseInt(value, 10) || value;
    }
    return parseIni(value);
  };
  const parsedEntries = Object.entries(iniObj).map(([key, value]) => [key, iter(value)]);
  return Object.fromEntries(parsedEntries);
};

const getData = (content, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(content);

    case 'yml':
      return yaml.safeLoad(content);

    case 'ini':
      return parseIni(ini.parse(content));

    default:
      throw new Error(`Unknown type: '${type}'!`);
  }
};

export default getData;
