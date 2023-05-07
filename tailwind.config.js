const forms = require("@tailwindcss/forms");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./views/**/*.pug"],
  theme: {
    screens: {
      sm: "640px",
      md: "728px",
      lg: "903px",
      xlg: "1023px",
    },
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
