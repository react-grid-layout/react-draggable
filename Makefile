# Mostly lifted from https://andreypopp.com/posts/2013-05-16-makefile-recipes-for-node-js.html
# Thanks @andreypopp

export BIN := $(shell npm bin)
DIST = dist
LIB = $(DIST)/react-draggable.js
MIN = $(DIST)/react-draggable.min.js

.PHONY: test dev build clean

clean:
	rm -rf dist

build: $(LIB) $(MIN)

# Allows usage of `make install`, `make link`
install link:
	@npm $@

dist/%.min.js: $(LIB) $(BIN)
	@$(BIN)/uglifyjs $< \
	  --output $@ \
	  --source-map $@.map \
	  --source-map-url $(basename $@.map) \
	  --in-source-map $<.map \
	  --compress warnings=false

dist/%.js: $(BIN)
	@$(BIN)/webpack --devtool source-map

test: $(BIN)
	@$(BIN)/karma start --single-run

dev: $(BIN)
	script/build-watch

node_modules/.bin: install

define release
	VERSION=`node -pe "require('./package.json').version"` && \
	NEXT_VERSION=`node -pe "require('semver').inc(\"$$VERSION\", '$(1)')"` && \
	node -e "\
		['./package.json', './bower.json'].forEach(function(fileName) {\
			var j = require(fileName);\
			j.version = \"$$NEXT_VERSION\";\
			var s = JSON.stringify(j, null, 2);\
			require('fs').writeFileSync(fileName, s);\
		});" && \
	git add package.json bower.json CHANGELOG.md && \
	git add -f dist/ && \
	git commit -m "release v$$NEXT_VERSION" && \
	git tag "v$$NEXT_VERSION" -m "release v$$NEXT_VERSION"
endef

release-patch: test clean build
	@$(call release,patch)

release-minor: test clean build
	@$(call release,minor)

release-major: test clean build
	@$(call release,major)

publish: clean build
	git push --tags origin HEAD:master
	npm publish
