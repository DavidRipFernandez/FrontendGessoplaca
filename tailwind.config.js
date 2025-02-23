/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
			  'custom-yellow': '#edac58',
			  'menu-color-dark':"#003161"
			},
	},
},
	plugins: [],
};
