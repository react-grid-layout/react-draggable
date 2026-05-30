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
# `clean` is an ORDER-ONLY prerequisite (after the `|`) on both leaf targets: make
# guarantees it runs exactly once and that both tsup and webpack wait for it before
# starting, so under parallel make (-j) we get one clean instead of a per-target
# race that could `rm -rf build` mid-write. The recipe runs after both
# prerequisites complete and verifies the published CJS/UMD contracts (see
# scripts/verify-build.cjs).
build: build-lib build-web
	@node scripts/verify-build.cjs

build-lib: $(BIN) | clean
	$(BIN)/tsup

build-web: $(BIN) | clean
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
