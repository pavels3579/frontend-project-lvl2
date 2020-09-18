install:
	  npm ci

test:
	  npm test --watchAll

publish:
	  npm publish  --dry-run

lint:
	  npx eslint .

test-coverage:
	  npm test -- --coverage --coverageProvider=v8
