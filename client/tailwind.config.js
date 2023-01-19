/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    container : {
      center: true,
      height: true,
    },
    extend: {},
  },
  plugins: [
      require('@tailwindcss/forms',)
  ],
}
