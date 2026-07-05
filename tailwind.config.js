/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#3629B7',
          2: '#5655B9',
          3: '#A8A3D7',
          4: '#F2F1F9',
        },
        neutral: {
          1: '#343434',
          2: '#898989',
          3: '#989898',
          4: '#CACACA',
          5: '#E0E0E0',
          6: '#FFFFFF',
        },
        semantic: {
          1: '#FF4267', // Error
          2: '#0890FE', // Info
          3: '#FFAF2A', // Warning
          4: '#52D5BA', // Success
          5: '#FB6B18', // Alert
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
