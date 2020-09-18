import fs from 'fs';

const getContent = (fullPath) => fs.readFileSync(fullPath, 'utf-8');

export default getContent;
