import yaml from 'js-yaml';
import ini from 'ini';

const getData = (content, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(content);

    case 'yml':
      return yaml.safeLoad(content);

    case 'ini':
      return ini.parse(content);

    default:
      throw new Error(`Unknown type: '${type}'!`);
  }
};

export default getData;
