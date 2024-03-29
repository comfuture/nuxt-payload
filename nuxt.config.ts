module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    modern: 'server',
    babel: {
      presets({ envName }, [preset, options]) {
        options.corejs = { version: 3 }
        if (envName === 'modern') {
          options.exclude = ['es.promise']
        }
      }
    }
  },
  modules: [
    '~/modules/payload/index.js'
  ],
  serverMiddleware: [
    '~/server/backend.js'
  ]
}
