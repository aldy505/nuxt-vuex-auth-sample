<template>
<div class="bg-gray-200 h-screen">


  <div class="px-56 py-16">
    <div class="border rounded-lg shadow-lg bg-white mb-10 py-4 px-8">
      <h1 class="text-4xl text-purple-700 font-bold">Read me first!</h1>
      <p class="text-base whitespace-pre-line">
        For this form below, you can put any of these email: <code>reinaldy@mail.com / johndoe@mail.com / stevew@mail.com</code>
        With the same password: <code>password</code> / Yeah it's not that good but this is for learning/experimenting purpose so yeah.
        You shall be redirected to <code>/dashboard</code> once your login succeed.
      </p>
    </div>

    <div class="border rounded-lg shadow-lg bg-white py-4 px-8">
      <h1 class="text-4xl font-bold text-purple-700">Please login</h1>
    <form @submit.prevent="formSubmit">
      <div class="flex flex-row items-center">
        <div class="flex-1">
          <p>Email</p>
        </div>
        <div class="flex-2"><input
            class="shadow bg-gray-100 appearance-none border border-gray-500 focus:border-purple-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email" v-model="login.email" name="emailInput" id="emailInput"></div>
      </div>
      <div class="flex mt-2 flex-row items-center">
        <div class="flex-1">
          <p>Password</p>
        </div>
        <div class="flex-2"><input
            class="shadow bg-gray-100  appearance-none border border-gray-500 focus:border-purple-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password" name="passwordInput" v-model="login.password" id="passwordInput"></div>
      </div>
      <div class="py-4">
        <p class="text-base whitespace-pre-line">Form values: {{ login.email }} / {{ login.password }}</p>
        <p class="text-base whitespace-pre-line">Error message: <span class="text-red-600">{{ errorMessage }}</span></p>
        <p class="text-base whitespace-pre-line">Login status: {{ loginStatus }}</p>
        <input type="hidden" name="_csrf" v-model="login._csrf">
      </div>
      <div class="flex">
        <div class="flex-1">
          <input type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            value="Login">
        </div>
      </div>
      <div v-if="authorized">
        <nuxt-link to="/dashboard">Click here if you're not redirected</nuxt-link>
      </div>
    </form>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  layout: 'default',
  data() {
    return {
      errorMessage: '',
      login: {
        _csrf: '',
        password: '',
        email: ''
      }
    }
  },
  async created() {
    if (this.authorized) {
      console.log('Index.vue logic line 74: You are authorized')
      this.$router.push({ name: 'dashboard' })
    } else {
      console.log('Index.vue logic line 77: You are not authorized (which is good if you first came in here)');
      try {
        /**
         * Fetching CSRF data from the API.
         * For more documentation on CSRF: https://github.com/expressjs/csurf 
         */
        await axios.get('http://localhost:3000/api/preform')
            .then(res => {
              this.login._csrf = res.data.csrfToken
            })
            .catch(err => {
              console.log('Index.vue logic line 88: Catch from CSRF fetch, see error details below:')
              this.errorMessage = 'Index.vue logic line 88: Catch from CSRF fetch, see error details in console.'
              console.log(err)
            })
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapState({
      loginStatus: 'auth.loginStatus',
      authorized: 'auth.authorized',
      userEmail: 'auth.userEmail'
    })    
  },
  methods: {
    async formSubmit() {
      try { 
        console.log('Index.js logic line 107: Form submit received')
        /**
         * This means calling the login action from ../store/auth.js
         * The action fetch data from the API, store it globally in Vuex State, and return a Promise.
         * For more documentation on Vuex: https://vuex.vuejs.org/ 
         */
        await this.$store.dispatch('auth/login', {
          email: this.login.email,
          password: this.login.password,
          csrf: this.login._csrf
        }).then(res => {
            this.$router.push({name: 'dashboard'})
          })
          .catch(err => {
            this.errorMessage = err
            console.log('Index.js logic line 122: error on store dispatch. See error notes below.');
            console.log(err)
          })
      } catch (err) {
        this.errorMessage = err
        console.log('Index.js logic line 127: error on trycatch. See error notes below.')
        console.log(err)
      }
    }
  }
}
</script>

<style lang="stylus">
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.flex-2 {
  flex: '2 2 0%'
}
</style>
