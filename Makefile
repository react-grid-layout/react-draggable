# Mostly lifted from https://andreypopp.com/posts/2013-05-16-makefile-recipes-for-node-js.html
# Thanks @andreypopp

# Make it parallel
MAKEFLAGS += j4
export BIN := $(shell yarn bin)
.PHONY: test dev lint build build-lib build-web clean install link publish
.DEFAULT_GOAL := build

clean:
	rm -rf build
	mkdir -p build

lint:
	@$(BIN)/eslint lib
	@$(BIN)/tsc --noEmit
	@$(BIN)/tsc -p typings

# tsup emits cjs + esm + dts into build/cjs (and rewrites build/cjs/cjs.js to the
# legacy module.exports === Draggable shape). webpack emits the UMD global bundle.
# Both depend on `clean` so the dir is reset first even under parallel make (-j).
# The recipe runs after both prerequisites complete and verifies the published
# CJS/UMD contracts (see scripts/verify-build.cjs).
build: build-lib build-web
	@node scripts/verify-build.cjs

build-lib: clean $(BIN)
	$(BIN)/tsup

build-web: clean $(BIN)
	$(BIN)/webpack --mode=production

# Allows usage of `make install`, `make link`
install link:
	@yarn $@

test: $(BIN)
	@$(BIN)/vitest run

test-browser: build $(BIN)
	@$(BIN)/vitest run --config vitest.browser.config.js

test-all: test test-browser

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
