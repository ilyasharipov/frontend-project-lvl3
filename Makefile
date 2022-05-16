serv:
	npx webpack serve

install:
	npm ci

build:
	rm -rf dist
	NODE_ENV=production npx webpack

lint:
	npx eslint .

#test-coverage:
#	npx jest --bail --coverage --coverageProvider=v8
#
#test:
#	npx jest
