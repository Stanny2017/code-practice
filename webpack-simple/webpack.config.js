module.exports = {
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							silent: true,
							transpileOnly: true,
						},
					},
				],
			},
			{
				test: /\.d.ts$/i,
				use: [{ loader: "raw-loader" }],
			},
		],
	},
	optimization: {
		concatenateModules: false,
	},
};
