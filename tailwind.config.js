/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        flow: {
          bg: '#0B1120',
          card: '#161b2c',
          'card-border': '#242b3d',
          input: '#0d111d',
          modal: '#1e2230',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
