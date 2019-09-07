# Mostly lifted from https://andreypopp.com/posts/2013-05-16-makefile-recipes-for-node-js.html
# Thanks @andreypopp

export BIN := $(shell yarn bin)
.PHONY: test dev lint build clean install link
.DEFAULT_GOAL := build

clean:
	rm -rf build

lint:
	@$(BIN)/flow
	@$(BIN)/eslint lib/* lib/utils/* specs/*
	@$(BIN)/tsc -p typings

build: clean
	$(BIN)/babel --out-dir ./build ./lib
	$(BIN)/webpack --mode=production --display-modules

# Allows usage of `make install`, `make link`
install link:
	@yarn $@

test: $(BIN)
	@NODE_ENV=test $(BIN)/karma start --single-run

dev: $(BIN) clean
	DRAGGABLE_DEBUG=true $(BIN)/webpack-dev-server

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
