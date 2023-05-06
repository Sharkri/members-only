const forms = require("@tailwindcss/forms");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./views/**/*.pug"],
  theme: {
    extend: {},
  },
  plugins: [
    forms,
    plugin(({ addUtilities }) => {
      addUtilities({
        ".thin-icon:before": {
          "-webkit-text-stroke": "0.3px white",
        },
      });
    }),
  ],
};
