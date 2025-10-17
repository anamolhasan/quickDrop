// const config = {
//   plugins: ["@tailwindcss/postcss"],
// };

// export default config;
/** @type {import('postcss').ProcessOptions} */
module.exports = {
  plugins: [
    '@tailwindcss/postcss',
    'autoprefixer',
  ],
};

