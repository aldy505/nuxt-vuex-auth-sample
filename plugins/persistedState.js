import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
import cookie from 'cookie';

export default ({store, req}) => {
  createPersistedState({
    key: 'nva',
    fetchBeforeUse: true,
    storage: {
      getItem: key => {
        // See https://nuxtjs.org/guide/plugins/#using-process-flags
        if (process.server) {
          const parsedCookies = cookie.parse(String(req.headers.cookie));
          return parsedCookies[key];
        }

        return Cookies.get(key);
      },
      // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      setItem: (key, value) =>
        Cookies.set(key, value, {expires: 1, secure: false}),
      removeItem: key => Cookies.remove(key),
    },
  })(store);
};
