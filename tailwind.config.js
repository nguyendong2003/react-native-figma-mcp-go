const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
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
        'poppins-regular': ['Poppins-Regular', 'sans-serif'],
        'poppins-medium': ['Poppins-Medium', 'sans-serif'],
        'poppins-semibold': ['Poppins-SemiBold', 'sans-serif'],
        'poppins-bold': ['Poppins-Bold', 'sans-serif'],
      },
      boxShadow: {
        'card-1': '0px 4px 30px rgba(54, 41, 183, 0.07)',
        'card-2': '0px 5px 30px rgba(0, 0, 0, 0.05)',
        'tab-bar': '0px -5px 30px rgba(54, 41, 183, 0.07)',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.text-title-1': {
          fontFamily: 'Poppins-SemiBold',
          fontSize: '24px',
          lineHeight: '28px',
        },
        '.text-title-2': {
          fontFamily: 'Poppins-SemiBold',
          fontSize: '20px',
          lineHeight: '28px',
        },
        '.text-title-3': {
          fontFamily: 'Poppins-SemiBold',
          fontSize: '16px',
          lineHeight: '24px',
        },
        '.text-body-1': {
          fontFamily: 'Poppins-Medium',
          fontSize: '16px',
          lineHeight: '24px',
        },
        '.text-body-2': {
          fontFamily: 'Poppins-Regular',
          fontSize: '16px',
          lineHeight: '24px',
        },
        '.text-body-3': {
          fontFamily: 'Poppins-Medium',
          fontSize: '14px',
          lineHeight: '21px',
        },
        '.text-caption-1': {
          fontFamily: 'Poppins-SemiBold',
          fontSize: '12px',
          lineHeight: '16px',
        },
        '.text-caption-2': {
          fontFamily: 'Poppins-Medium',
          fontSize: '12px',
          lineHeight: '16px',
        },
      });
    }),
  ],
};
