# Mostly lifted from https://andreypopp.com/posts/2013-05-16-makefile-recipes-for-node-js.html
# Thanks @andreypopp

# Make it parallel
MAKEFLAGS += j4
export BIN := $(shell yarn bin)
.PHONY: test dev lint build build-lib build-web clean install link publish \
        check-release release-patch release-minor release-major
.DEFAULT_GOAL := build

clean:
	rm -rf build
	mkdir -p build

lint:
	@$(BIN)/eslint lib
	@$(BIN)/tsc --noEmit
	@$(BIN)/tsc -p typings
	@$(BIN)/tsc -p typings/tsconfig.react18.json

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

# ── Release ──────────────────────────────────────────────────────────────────
# Two steps, deliberately separate:
#
#   make release-patch    bump package.json, commit, tag. Local only.
#   make publish          verify, rebuild, push, publish to npm.
#
# Cut the release LAST. `release-*` tags whatever HEAD is at the time, so any
# commit you land afterwards leaves the tag stranded behind the tip and publish
# will stop and tell you to move it.
#
# The dirty-tree guard excludes CHANGELOG.md, which you are expected to have
# edited and which the release commit picks up.
define release
	if [ -n "`git status --porcelain --untracked-files=no -- . ':(exclude)CHANGELOG.md'`" ]; then \
		echo "ERROR: uncommitted changes outside CHANGELOG.md; commit or stash first"; \
		git status --short --untracked-files=no -- . ':(exclude)CHANGELOG.md'; \
		exit 1; \
	fi && \
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
	git tag "v$$NEXT_VERSION" -m "release v$$NEXT_VERSION" && \
	echo "" && \
	echo "tagged v$$NEXT_VERSION. Nothing has been pushed. Run \`make publish\` to ship it."

endef

# lint + test + build, so a version can never be tagged on a tree that does not
# lint, test, or build. Previously this ran unit tests only.
release-patch: lint test build
	@$(call release,patch)

release-minor: lint test build
	@$(call release,minor)

release-major: lint test build
	@$(call release,major)

# Standalone so you can ask "is this publishable?" without publishing.
check-release:
	@node scripts/check-release.cjs

# The sub-makes keep the gate strictly before the build under parallel make
# (MAKEFLAGS += j4 above); as plain prerequisites they would race.
#
# `npm publish`, not `yarn publish`: yarn 1's publish prompts for a version,
# writes it to package.json, and creates its own tag. release-* already did all
# three, so yarn re-bumped every release and asked a question with no right
# answer. npm publish just publishes the version already in package.json. This
# is the one place the project does not use yarn; installs and adds still do.
publish:
	@$(MAKE) check-release
	@$(MAKE) build
	git push --follow-tags origin master
	npm publish
