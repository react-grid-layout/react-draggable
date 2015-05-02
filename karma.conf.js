module.exports = function(config) {
	config.set({

		basePath: '',

		frameworks: ['jasmine'],

		files: [
			'specs/main.js'
		],

		exclude: [
		],

		preprocessors: {
			'specs/main.js': ['webpack']
		},

		webpack: {
			cache: true,
			module: {
				loaders: [
					{test: /\.js$/, loader: 'jsx-loader'}
				]
			}
		},

		webpackServer: {
			stats: {
				colors: true
			}
		},

		reporters: ['progress'],

		port: 9876,

		colors: true,

		logLevel: config.LOG_INFO,

		autoWatch: false,

		browsers: ['Chrome'],

		singleRun: false,

		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-firefox-launcher'),
			require('karma-webpack')
		]
	});
};
