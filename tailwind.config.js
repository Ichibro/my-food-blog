/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode via 'class'
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@headlessui/react/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors if needed
        primary: {
          light: '#d0bcff',
          DEFAULT: '#8b5cf6',
          dark: '#6d28d9',
        },
        secondary: {
          light: '#fbcfe8',
          DEFAULT: '#ec4899',
          dark: '#db2777',
        },
      },
      boxShadow: {
        'indigo-glow': '0 4px 6px -1px rgba(129, 140, 248, 0.6), 0 2px 4px -1px rgba(129, 140, 248, 0.3)',
        'pink-glow': '0 4px 6px -1px rgba(251, 113, 133, 0.6), 0 2px 4px -1px rgba(251, 113, 133, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [

  ],
};
