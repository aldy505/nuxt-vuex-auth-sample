import {defineConfig} from 'windicss/helpers';

export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        body: ['Atkinson Hyperlegible', 'sans-serif'],
      },
      flex: {
        1: '1 1 0%',
        2: '2 2 0%',
        3: '3 3 0%',
      },
    },

  },
});
