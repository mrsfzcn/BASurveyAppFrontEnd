/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        firstColor: "rgb(34, 33, 55)",
        secondColor: "#64e9b1",
      },
    },
    screens: {
      mobile: {'max':'390px'},
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
      xldesktop: "1920px",
    },
  },
  plugins: [],
};
