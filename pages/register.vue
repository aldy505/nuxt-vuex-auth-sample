<template>
  <div class="border rounded-lg shadow-lg bg-white py-4 px-8">
    <h1 class="text-4xl font-bold text-indigo-700 py-3">
      Register
    </h1>
    <form @submit.prevent="register">
      <div class="flex flex-col w-full">
        <div class="flex-1 py-2">
          Name
        </div>
        <div class="flex-1">
          <input
            type="text"
            v-model="form.name"
            class="shadow bg-light-500 appearance-none border-none focus:border-indigo-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:(outline-none shadow-outline bg-light-100)"
            required
          >
        </div>
        <div class="flex-1 py-2">
          Email
        </div>
        <div class="flex-1">
          <input
            type="email"
            v-model="form.email"
            class="shadow bg-light-500 appearance-none border-none focus:border-indigo-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:(outline-none shadow-outline bg-light-100)"
            required
          >
        </div>
        <div class="flex-1 py-2">
          Password
        </div>
        <div class="flex-1">
          <input
            type="password"
            v-model="form.password"
            class="shadow bg-light-500 appearance-none border-none focus:border-indigo-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:(outline-none shadow-outline bg-light-100)"
            required
          >
        </div>
        <div class="flex-1 py-4">
          <button
            type="submit"
            class="w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :class="authorized ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-700'"
            :disabled="authorized"
          >
            Register
          </button>
        </div>
        <div class="flex-1 py-4">
          <p class="text-base text-red-600">
            {{ errorMessage }}
          </p>
        </div>
        <div class="flex-1 py-4">
          Already have an account <nuxt-link
            to="/"
            class="text-indigo-700 hover:underline"
          >
            Sign in!
          </nuxt-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: '',
      form: {
        name: '',
        email: '',
        password: '',
        csrf: '',
      },
    };
  },
  async mounted() {
    try {
      const response = await this.$http.$get('/api/register', {headers: {accept: 'application/json'}});
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
    async register() {
      try {
        await this.$store.dispatch('auth/register', {...this.form});
        await this.$router.push('/');
      } catch (error) {
        this.errorMessage = error.response.data.message || error.response.data.error || error;
      }
    },
  },
};
</script>
