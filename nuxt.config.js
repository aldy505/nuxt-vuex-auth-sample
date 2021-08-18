export default {
  target: 'server',
  ssr: true,
  head: {
    title: 'You Don\'t Need @nuxt/auth module!',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
  },

  plugins: [{src: '~/plugins/persistedState.js'}],

  components: true,
  serverMiddleware: [{path: '/api', handler: '~/api/index.js'}],

  buildModules: [
    'nuxt-windicss',
  ],
  modules: [
    '@nuxt/http',
    '@nuxtjs/dayjs',
  ],
};
