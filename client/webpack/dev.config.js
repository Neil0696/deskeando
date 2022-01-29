const { merge } = require("webpack-merge");

const common = require("./common.config");

module.exports = merge(common, {
	devtool: "inline-source-map",
	devServer: {
		historyApiFallback: true,
		port: 3000,
		proxy: {
			"/api": "http://localhost:3100",
		},
	},
	mode: "development",
	resolve: {
		fallback: {
			crypto: false, // do not include a polyfill for abc
			path: false,
		},
	},
});
