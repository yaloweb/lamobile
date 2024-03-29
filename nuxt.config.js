export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 3001
  },
  head: {
    title: 'lamobile',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/sass/main.sass'
  ],

  // loading: {
  //   color: '#FD5C2D',
  //   height: '3px'
  // },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/axios.js',
    '~plugins/filters.js',
    '~plugins/directives.js',
    '~plugins/vuelidate.js',
    '~plugins/tooltip.js',
    {
      src: '~plugins/custom-scripts.js',
      ssr: false
    },
    {
      src: '~plugins/youtube.js',
      ssr: false
    },
    {
      src: '~plugins/mask.js',
      ssr: false
    },
    {
      src: '~plugins/select.js',
      ssr: false
    },
    {
      src: '~plugins/masonry.js',
      ssr: false
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy/',
    // '@nuxtjs/auth',
    ['@nuxtjs/recaptcha',
      {
        siteKey: '6LdrzqsgAAAAAO8Da90Ojv3cpOSOdmhMpcEMZNl_',
        version: 3,
        mode: 'enterprise'
      }
    ],
    'cookie-universal-nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://natural.lamobile.ru/api/natural',
    proxyHeaders: false,
    credentials: false,
    init (axios) {
      axios.defaults.withCredentials = false
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
