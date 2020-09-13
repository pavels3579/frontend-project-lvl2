import fs from 'fs';

const getContent = (fullFilename) => fs.readFileSync(fullFilename, 'utf-8');

export default getContent;
