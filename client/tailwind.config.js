module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Adjust this to match your project structure
  theme: {
    extend: {
      keyframes: {
        test1: {
          '0%': { top: '20%', left: '20%' },
          '50%': { top: '20%', left: '50%' },
          '75%': { top: '40%', left: '20%' },
          '100%': { top: '20%', left: '20%' },
        },
        test2: {
          '0%': { top: '60%', left: '30%' },
          '50%': { top: '10%', left: '10%' },
          '75%': { top: '60%', left: '90%' },
          '100%': { top: '60%', left: '30%' },
        },
        test3: {
          '0%': { top: '60%', left: '30%' },
          '50%': { top: '50%', left: '50%' },
          '75%': { top: '70%', left: '10%' },
          '100%': { top: '60%', left: '30%' },
        },
        test4: {
          '0%': { top: '60%', left: '60%' },
          '50%': { top: '60%', left: '10%' },
          '75%': { top: '10%', left: '20%' },
          '100%': { top: '60%', left: '60%' },
        },
        test5: {
          '0%': { top: '70%', left: '50%' },
          '50%': { top: '10%', left: '90%' },
          '75%': { top: '30%', left: '20%' },
          '100%': { top: '70%', left: '50%' },
        },
        test6: {
          '0%': { top: '20%', left: '38%' },
          '50%': { top: '30%', left: '50%' },
          '75%': { top: '40%', left: '20%' },
          '100%': { top: '20%', left: '38%' },
        },
      },
      animation: {
        test1: 'test1 40s linear infinite',
        test2: 'test2 40s linear infinite',
        test3: 'test3 40s linear infinite',
        test4: 'test4 40s linear infinite',
        test5: 'test5 40s linear infinite',
        test6: 'test6 40s linear infinite',
      },
      boxShadow: {
        custom: '0 4px 8px rgba(0, 0, 0, 1)',
      },
      
    },
  },
  plugins: [],
};
