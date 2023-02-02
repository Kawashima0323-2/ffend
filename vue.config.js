const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
        transpileDependencies: [
            'vuetify'
        ]
    },

)
module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                '/hotpepper': {
                    target: 'http://webservice.recruit.co.jp',
                }
            }
        }
    },

}