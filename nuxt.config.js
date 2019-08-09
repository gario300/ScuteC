
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Scute: ¡Gana dinero dibujando!',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.9.0/css/all.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/vee-validate.js',
    { src: '~plugins/vue-infinite-scroll.js', ssr: false },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['@nuxtjs/moment', { locales: ['es'], defaultLocale: 'es' }]
  
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://127.0.0.1:3333'
  },
  auth: {
    token: { prefix: 'token' },
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'data.token' },
          user: { url: 'account/me', method: 'get', propertyName: 'data' },
          logout: false
        }
      },
    },  
    cookie: {
      name: 'token',
    },
    redirect: {
      login: '/',
    }
  },


  /*
  ** Build configuration
  */
  build: 
  {vendor: ['vee-validate','vue-infinite-scroll'],
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
     
    }
  }
}
