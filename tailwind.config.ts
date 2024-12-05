import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'selector',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:{
          normal: "var(--bg-normal)",
          shallow: "var(--bg-shallow)",
        },
        text:{
          normal: "var(--text-normal)",
          shallow: "var(--text-shallow)",
          shallower: "var(--text-shallower)",
          shallowest: "var(--text-shallowest)",
        },
      },
      animation: {
        flicker: 'flicker 1.2s steps(30, end) infinite',
        emerge: 'emerge .3s',
        show: 'show forwards .3s',
        hide: '.3s reverse forwards show',
        slideFromRight: 'slideFromRight forwards .3s',
        slideToRight: '.3s reverse forwards slideFromRight',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
        emerge: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        show: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideFromRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        // hide: {
        //   '0%': { opacity: '1' },
        //   '100%': { opacity: '0' },
        // },
        // slideLeft: {
        //   '0%': { transform: 'translateX(-100%)' },
        //   '100%': { transform: 'translateX(0)' },
        // },
      }
    },
  },
  plugins: [],
};
export default config;
