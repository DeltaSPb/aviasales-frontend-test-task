install: install-deps

develop:
	npx webpack-dev-server --open

install-deps:
	npm install

build:
	rm -rf dist
	NODE_ENV=production npx webpack

test:
	npm test -s

test-watch:
	npm test -- --watch

test-coverage:
	npm test -- --coverage

lint:
	npx eslint . --ext js,jsx

deploy:
	git push heroku

.PHONY: test
