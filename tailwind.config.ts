import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: {
          gold: '#FFB26B',
          blue: '#0A2F45',
          lightBlue: '#5A9BD3', // Un azul más claro para contrastar con el azul oscuro
          darkBlue: '#003F5C', // Un azul más oscuro para proporcionar profundidad
          lightGold: '#FFD700', // Un dorado más claro para variaciones en el dorado
          darkGold: '#C99700', // Un dorado más oscuro para acentos
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
