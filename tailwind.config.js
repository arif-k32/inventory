/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class',
  content: ["./src/**/*.{html,js}",'node_modules/preline/dist/*.js',],
  theme: {
    extend: {},
  },
  plugins: [require('preline/plugin')],
}