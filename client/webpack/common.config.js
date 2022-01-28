const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./client/src/index.js",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				loader: "file-loader",
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							url: {
								filter: (url) => {
									// Semantic-UI-CSS has an extra semi colon in one of the URL due to which CSS loader along
									// with webpack 5 fails to generate a build.
									// Below if condition is a hack. After Semantic-UI-CSS fixes this, one can replace use clause with just
									// use: ['style-loader', 'css-loader']
									if (url.includes("charset=utf-8;;")) {
										return false;
									}
									return true;
								},
							},
						},
					},
				],
			},
		],
	},
	output: {
		publicPath: "/",
	},
	plugins: [
		new HtmlWebpackPlugin({
			favicon: "./client/src/favicon.ico",
			template: "./client/src/index.html",
		}),
	],
	resolve: {
    fallback: {
      crypto: false, // do not include a polyfill for abc
      path: false ,
    },
  },
};
