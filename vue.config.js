const { defineConfig } = require('@vue/cli-service')

const plugins = []

/* if (process.env.NODE_ENV === 'production') {
  
  const PrerendererWebpackPlugin = require('@prerenderer/webpack-plugin')
  
	plugins.unshift(
		new PrerendererWebpackPlugin({
			routes: ["/", "/avisos", "/panel/iniciar-sesion", "/fundacion", "/reglamento", "/calendarios", "/anecdotas", "/crear/anecdota", "/usuarios/iniciar-sesion",
      "/usuarios/registrarse", "/nosotros", "/contactanos"],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterDocumentEvent: 'render-complete',
        headless: false
      }
		})
	)
} */

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins,
    module: {
      rules: [
        {
          test: /\.(pdf)(\?.*)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/pdf/[name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    }
  } 
})
