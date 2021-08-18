<template>
  <div class="border rounded-lg shadow-lg bg-white py-4 px-8">
    <h1 class="text-4xl font-bold text-indigo-700 py-3">
      Dashboard!
    </h1>
    <p class="text-base py-4">
      Hey there! If you're seeing this, that means you've successfully logged in.
    </p>
    <p class="text-base py-4">
      Anyway here's your data: <pre>{{ JSON.stringify(userData, null, 2) }}</pre>
    </p>
    <p
      class="text-base py-4 cursor-pointer hover:underline"
      @click="logout"
    >
      Log out
    </p>
  </div>
</template>

<script>
export default {
  middleware: 'restricted',
  computed: {
    userData() {
      return this.$store.state.auth.userData;
    },
  },
  methods: {
    logout() {
      this.$store.commit('auth/setUserData', {});
      this.$store.commit('auth/setToken', {token: '', clear: true});
      this.$store.commit('auth/toggleAuthorized');
      this.$router.push('/');
    },
  },
};
</script>
