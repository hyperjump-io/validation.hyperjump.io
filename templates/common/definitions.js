module.exports = ({ origin }) => ({
  $meta: { $href: `${origin}/common` },
  type: "object",
  patternProperties: {
    "": {
      type: "object",
      validation: true
    }
  }
});
