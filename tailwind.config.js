/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	  "./src/**/*.{js,jsx,ts,tsx,md}",
	  "./docs/**/*.{js,jsx,ts,tsx,md}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: { preflight: false }
};

