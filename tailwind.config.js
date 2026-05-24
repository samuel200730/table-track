/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF7F0',
          200: '#F5EFE0',
        },
        espresso: {
          500: '#3D2314',
          600: '#2A1709',
          700: '#1A0E05',
          800: '#0F0802',
        },
        amber: {
          warm: '#C8860A',
          light: '#F5A623',
        },
        sage: {
          400: '#7B9E87',
          500: '#5E8A6E',
        }
      },
      boxShadow: {
        'card': '0 2px 20px rgba(61, 35, 20, 0.08), 0 1px 4px rgba(61, 35, 20, 0.04)',
        'card-hover': '0 8px 40px rgba(61, 35, 20, 0.14), 0 2px 8px rgba(61, 35, 20, 0.08)',
        'modal': '0 24px 80px rgba(61, 35, 20, 0.20)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
}
