import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        taxi: {
          yellow: '#F2E12D',
          black: '#0B0D12',
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;

