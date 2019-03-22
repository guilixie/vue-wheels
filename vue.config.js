const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
const svgPath = 'src/assets/icons'

function resolve(dir) {
	return path.join(__dirname, '.', dir)
}

module.exports = {
	devServer: {
		host: '0.0.0.0',
		port: 8866,
		contentBase: path.join(__dirname + '/src/'),
		hot: true,
		historyApiFallback: true
	},
	publicPath: isProduction ? './' : '/',
	outputDir: 'dist',
	assetsDir: 'src',
	chainWebpack: config => {
		// config.module.rules.delete('svg')
		// config.module.rule('svg').uses.clear()
		config.module
			.rule('svg')
			.exclude.add(resolve(svgPath))
			.end()

		config.module
			.rule('svg-sprite-loader')
			.test(/\.svg$/)
			.include.add(resolve(svgPath))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
	}
	/* configureWebpack: {
		module: {
			rules: [
				{
					test: /\.svg$/,
					loader: 'svg-sprite-loader',
					include: [resolve(svgPath)],
					options: {
						symbolId: 'icon-[name]'
					}
				},
				{
					test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
					exclude: [resolve(svgPath)]
				}
			]
		}
	} */
}
