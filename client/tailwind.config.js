/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('../src/assets/images/Wrigley_Field_02.webp')"
      },
      backgroundPosition: {
        'left-center': '-300px center',
        'center': 'center center',
      },
      colors: {
        'cubblue': '#1B2D53',
        'cubred': '#CF102B',
        'white': '#FFFFFF',
      },
    },
  },
  plugins: [],
}

