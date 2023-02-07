const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	/*
	//раскоментировать для сборки в один js файл
	productionSourceMap: false,
	filenameHashing: false,
	integrity: true,
	css:{
		extract: false
	},
	configureWebpack: {
		optimization: {
		  splitChunks: false,
		},
	},
	*/
})
