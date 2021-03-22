# Mostly lifted from https://andreypopp.com/posts/2013-05-16-makefile-recipes-for-node-js.html
# Thanks @andreypopp

# Make it parallel
MAKEFLAGS += j4
export BIN := $(shell yarn bin)
.PHONY: test dev lint build build-cjs build-esm build-web clean install link publish
.DEFAULT_GOAL := build

clean:
	rm -rf build
	mkdir -p build

lint:
	@$(BIN)/flow
	@$(BIN)/eslint lib/* lib/utils/* specs/*
	@$(BIN)/tsc -p typings

build: clean build-cjs build-esm build-web

build-cjs: $(BIN)
	$(BIN)/babel --out-dir ./build/cjs ./lib

build-web: $(BIN)
	$(BIN)/webpack --mode=production

# Allows usage of `make install`, `make link`
install link:
	@yarn $@

test: $(BIN)
	@$(BIN)/karma start

test-phantom: $(BIN)
	@$(BIN)/karma start karma-phantomjs.conf.js

dev: $(BIN) clean
	env DRAGGABLE_DEBUG=1 $(BIN)/webpack serve --mode=development

node_modules/.bin: install

define release
	VERSION=`node -pe "require('./package.json').version"` && \
	NEXT_VERSION=`node -pe "require('semver').inc(\"$$VERSION\", '$(1)')"` && \
	node -e "\
		['./package.json'].forEach(function(fileName) {\
			var j = require(fileName);\
			j.version = \"$$NEXT_VERSION\";\
			var s = JSON.stringify(j, null, 2);\
			require('fs').writeFileSync(fileName, s);\
		});" && \
	git add package.json CHANGELOG.md && \
	git commit -m "release v$$NEXT_VERSION" && \
	git tag "v$$NEXT_VERSION" -m "release v$$NEXT_VERSION"
endef

release-patch: test
	@$(call release,patch)

release-minor: test
	@$(call release,minor)

release-major: test
	@$(call release,major)

publish: build
	git push --tags origin HEAD:master
	yarn publish
