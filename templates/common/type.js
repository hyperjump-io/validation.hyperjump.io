module.exports = ({ origin }) => ({
  $meta: { $href: `${origin}/common` },
  anyOf: [
    { const: "null" },
    { const: "boolean" },
    { const: "object" },
    { const: "array" },
    { const: "number" },
    { const: "string" }
  ]
});
