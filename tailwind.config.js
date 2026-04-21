/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F3460',
          light: '#1B4D7E',
          dark: '#081F3F',
          50: '#EEF4FB',
        },
        crimson: {
          DEFAULT: '#B5162B',
          light: '#D91A34',
          dark: '#8C1020',
        },
        gold: {
          DEFAULT: '#F5C518',
          light: '#FDE16A',
          dark: '#D4A510',
        },
        surface: '#F7F9FC',
        'gray-border': '#DDE3EE',
      },
      fontFamily: {
        head: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(15,52,96,0.08)',
        'card-hover': '0 6px 24px rgba(15,52,96,0.14)',
        modal: '0 16px 48px rgba(15,52,96,0.18)',
      },
      borderRadius: {
        card: '12px',
        pill: '999px',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pop': 'pop 0.2s ease-out',
        'ring-fill': 'ringFill 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pop: { '0%': { transform: 'scale(0.9)' }, '60%': { transform: 'scale(1.05)' }, '100%': { transform: 'scale(1)' } },
        ringFill: { from: { 'stroke-dashoffset': '100' }, to: { 'stroke-dashoffset': '0' } },
      },
    },
  },
  plugins: [],
}
