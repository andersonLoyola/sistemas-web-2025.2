/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            j4m: {
                pink: '#E91E63',
                purple: '#18042C',
                card: '#2A2A2A',
                sidebar: '#0F0F0F',
                text: '#F5F5F5'
            }
        }
    },
  },
  plugins: [],
}

