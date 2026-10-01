/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#07080b',
          800: '#0d1017',
          700: '#161b26',
          600: '#222838',
        },
        cyber: {
          neon: '#45db7d',
          lime: '#def54f',
          blue: '#6ac9ff',
          orange: '#fa7328',
          purple: '#a855f7',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Outfit', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-neon': '0 0 25px rgba(69, 219, 125, 0.45)',
        'glow-lime': '0 0 25px rgba(222, 245, 79, 0.45)',
        'glow-blue': '0 0 25px rgba(106, 201, 255, 0.45)',
        'glow-orange': '0 0 25px rgba(250, 115, 40, 0.45)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
