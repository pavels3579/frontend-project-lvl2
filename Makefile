install:
	  npm ci

test:
	  npm test --watch

publish:
	  npm publish  --dry-run

lint:
	  npx eslint .

test-coverage:
	  npm test -- --coverage --coverageProvider=v8
