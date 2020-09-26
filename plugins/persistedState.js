import VuexPersistence from 'vuex-persistedstate'

function getPlugins() {
  let plugins = []

  if (process.browser) {
      const vuexLocal = new VuexPersistence({
          storage: window.localStorage
      })

      plugins.push(vuexLocal.plugin)
  }
}

export const plugins = getPlugins()