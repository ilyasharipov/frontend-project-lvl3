serv:
	npx webpack serve

install:
	npm ci

build:
	rm -rf dist
	NODE_ENV=production npx webpack

test:
	npm test

lint:
	npx eslint .

test-coverage:
    npx -n --experimental-vm-modules jest --coverage --coverageProvider=v8
