/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      colors: {
        //기존 제일 진한 색상이 너무 연한 느낌이라 추가한 색
        primary5: "#66A648",
        primary1: "#B0DB9C",
        primary2: "#CAE8BD",
        primary3: "#DDF6D2",
        primary4: "#ECFAE5",
        lightgray: "#CCCCCC",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
