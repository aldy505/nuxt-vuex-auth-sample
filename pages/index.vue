<template>
  <div class="">
    <div class="border rounded-lg shadow-lg bg-white mb-10 py-4 px-8">
      <div
        v-if="authorized"
        :key="authorized"
      >
        <h1 class="text-4xl font-bold text-indigo-700 py-3">
          What are you doing here?
        </h1>
        <p class="text-base py-4">
          <nuxt-link
            to="/dashboard"
            class="hover:underline"
          >
            Click here to go to dashboard
          </nuxt-link>
        </p>
      </div>
      <div v-else>
        <h1 class="text-4xl font-bold text-indigo-700 py-3">
          Read me!
        </h1>
        <p class="text-base py-4">
          This is the normal login/register/logout functionality without @nuxt/auth. Register first to gain your account.
        </p>
      </div>
    </div>

    <div class="border rounded-lg shadow-lg bg-white py-4 px-8">
      <h1 class="text-4xl font-bold text-indigo-700 py-3">
        Login
      </h1>
      <form @submit.prevent="login">
        <div class="flex flex-col w-full">
          <div class="flex-1 py-2">
            <p>Email</p>
          </div>
          <div class="flex-1">
            <input
              class="shadow bg-light-500 appearance-none border-none focus:border-indigo-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:(outline-none shadow-outline bg-light-100)"
              type="email"
              v-model="form.email"
              required
            >
          </div>
          <div class="flex-1 py-2">
            <p>Password</p>
          </div>
          <div class="flex-1">
            <input
              class="shadow bg-light-500 appearance-none border-none focus:border-indigo-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:(outline-none shadow-outline bg-light-100)"
              type="password"
              v-model="form.password"
              required
            >
          </div>
          <div class="flex-1 py-4">
            <button
              type="submit"
              class="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              :class="authorized ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-700'"
              :disabled="authorized"
            >
              Login
            </button>
          </div>
          <div class="flex-1 py-4">
            <p class="text-base text-red-600">
              {{ errorMessage }}
            </p>
          </div>
          <div class="flex-1 py-4">
            Don't have an account? <nuxt-link
              to="/register"
              class="text-indigo-700 hover:underline"
            >
              Register!
            </nuxt-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: '',
      form: {
        csrf: '',
        password: '',
        email: '',
      },
    };
  },
  async mounted() {
    try {
      const response = await this.$http.$get('/api/login', {headers: {accept: 'application/json'}});
      this.form.csrf = response.token;
    } catch (error) {
      this.errorMessage = error.response.data.message || error.response.data.error || error;
    }
  },
  computed: {
    authorized() {
      return this.$store.state.auth.authorized;
    },
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('auth/login', {...this.form});
        this.$router.push('/dashboard');
      } catch (error) {
        this.errorMessage = error.response.data.message || error.response.data.error || error;
      }
    },
  },
};
</script>
