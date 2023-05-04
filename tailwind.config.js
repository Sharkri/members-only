const forms = require("@tailwindcss/forms");

module.exports = {
  content: ["./views/**/*.pug"],
  theme: {
    extend: {},
  },
  plugins: [forms],
};
