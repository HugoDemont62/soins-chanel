/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chanel': {
          'black': '#000000',
          'white': '#FFFFFF',
          'beige': '#F5F2E8',
          'gold': '#D4AF37',
          'cream': '#FFF8DC',
          'gray': {
            50: '#F9F9F9',
            100: '#F5F5F5',
            200: '#E5E5E5',
            300: '#D4D4D4',
            400: '#A3A3A3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          }
        }
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'elegant': ['Playfair Display', 'serif'],
      },
      animation: {
        'fadeInUp': 'fadeInUp 1s ease forwards',
        'fadeIn': 'fadeIn 1s ease forwards',
        'bounce': 'bounce 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          }
        },
        fadeIn: {
          'to': {
            opacity: '1',
          }
        },
        bounce: {
          '0%, 20%, 50%, 80%, 100%': {
            transform: 'rotate(45deg) translateY(0)',
          },
          '40%': {
            transform: 'rotate(45deg) translateY(-8px)',
          },
          '60%': {
            transform: 'rotate(45deg) translateY(-4px)',
          }
        }
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        'md': '12px',
      }
    },
  },
  plugins: [],
}