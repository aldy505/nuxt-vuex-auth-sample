/**
 * State in Vuex is like Vue's data that can store.. well, data.
 * But it's not just for a specific page. Instead, it's globally enabled.
 * So you can access the data (in this case--state) from any page.
 *
 * You can access state from any page (in /pages folder) with:
 * this.$store.state.(filename in store).(variable name)
 * Example: this.$store.state.auth.authorized   // this will return the value 'false'
 *
 * For learn more about Vue data: https://vuejs.org/v2/guide/index.html#Declarative-Rendering
 * For learn more about Vuex state: https://vuex.vuejs.org/guide/state.html
 */
export const state = () => ({
  authorized: false,
  token: null,
  userData: {},
});

/**
 * Mutation in Vuex is the only way for changing values in State.
 * You can't change State values with something like:
 * this.authorized = true;
 * But you have to do it through mutation. I think this will provide more security(?)
 *
 * You can do mutation from any page (in /pages folder, once again) with:
 * this.$store.commit('(filename)/(mutation name)', values)
 * Example: this.$store.commit('auth/setAuthorized', true)
 *
 * For learn more about Vuex Mutation: https://vuex.vuejs.org/guide/mutations.html
 */
export const mutations = {
  toggleAuthorized(state) {
    state.authorized = !state.authorized;
  },
  setToken(state, {token, clear}) {
    state.token = clear ? '' : `Bearer ${token}`;
  },
  setUserData(state, payload) {
    state.userData = payload;
  },
};

/**
 * Actions is like function that you can do before commit data through Mutations.
 * It uses async function so you can return a Promise from it.
 *
 * You can call mutation from any page with:
 * this.$store.dispatch('(filename)/(function)', values)
 *
 * Commit object below when called will call a Mutation on this same file.
 * Dispatch object below when called will call another Actions function on this same file.
 *
 * For learn more about Vuex Actions: https://vuex.vuejs.org/guide/actions.html
 */
export const actions = {
  // Sometimes, I'd like to treat Vuex actions as pure function that I can call where ever I like.
  async register(_context, {name, email, password, csrf}) {
    try {
      const response = await this.$http.$post(
        '/api/register',
        {
          name,
          email,
          password,
          _csrf: csrf,
        },
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async login({commit}, {email, password, csrf}) {
    try {
      const response = await this.$http.$post(
        '/api/login',
        {
          email,
          password,
          _csrf: csrf,
        },
      );
      await commit('setToken', {token: response.token, clear: false});
      await commit('toggleAuthorized');
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async verify({commit, state}) {
    try {
      // Check state.token first
      if (!state.token?.startsWith('Bearer')) {
        return Promise.reject(new Error('token is empty'));
      }

      const response = await this.$http.$get(
        '/api/data',
        {
          headers: {
            authorization: state.token,
          },
        },
      );
      await commit('setUserData', response);
      return Promise.resolve(response);
    } catch (error) {
      await commit('setUserData', {});
      await commit('setToken', {token: '', clear: true});
      await commit('toggleAuthorized');
      return Promise.reject(error);
    }
  },
};
