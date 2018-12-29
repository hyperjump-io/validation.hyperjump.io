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

app.get("/common", (req, res) => {
  res.set("Content-Type", "application/reference+json");
  res.sendFile(`${__dirname}/common.json`);
});

app.get("/common/:name", (req, res) => {
  res.set("Content-Type", "application/validation+json");
  res.sendFile(`${__dirname}/common/${req.params.name}.json`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`validation.hyperjump.io listening on port ${port}`));
