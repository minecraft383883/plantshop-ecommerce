/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dendro: {
          green: '#485935',      // Verde principal
          olive: '#93A267',      // Verde oliva
          mint: '#CADBB7',       // Verde menta
          white: '#FBFBFB',      // Blanco
          dark: '#2C3E1F',       // Texto oscuro
          gray: '#E8EDE4',       // Gris suave
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
