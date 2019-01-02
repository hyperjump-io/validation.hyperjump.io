const express = require("express");
const { decorateApp } = require("@awaitjs/express");
const cors = require("cors");
const morgan = require("morgan");


const app = decorateApp(express());

const corsOptions = {
  origin: ["*"],
  maxAge: 3600,
  methods: ["HEAD", "GET"]
};
app.use(cors(corsOptions));

app.use(morgan("combined"));

const conneg = (types) => (req, res, next) => {
  const contentType = req.accepts(types);
  if (!contentType) {
    res.status(406).end();
  } else {
    res.set("Content-Type", contentType);
    next();
  }
};

app.get("/common", conneg(["application/reference+json", "application/json"]));
app.use("/common/*", conneg(["application/validation+json", "application/reference+json", "application/json"]));

const year = 31536000000;
app.get("*", (req, res) => {
  return res.sendFile(`${__dirname}/${req.path}.json`, { maxAge: year, immutable: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`validation.hyperjump.io listening on port ${port}`));
