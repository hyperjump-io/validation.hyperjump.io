const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");


const app = express();

const corsOptions = {
  origin: true,
  maxAge: 3600,
  methods: ["HEAD", "GET"]
};
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(compression());

const conneg = (types) => (req, res, next) => {
  const contentType = req.accepts(types);
  if (!contentType) {
    res.status(406).end();
  } else {
    res.set("Content-Type", contentType);
    next();
  }
};

app.get("/common", conneg(["application/reference+json"]));
app.use("/common/*", conneg(["application/validation+json"]));

const year = 31536000000;
app.get("*", (req, res) => {
  try {
    const template = require(`./templates${req.path}`);
    const scheme = "cf-visitor" in req.headers ? JSON.parse(req.headers["cf-visitor"])["scheme"] : req.protocol;
    res.setHeader("Cache-Control", `public, max-age=${year}, immutable`)
    res.send(template({ origin: `${scheme}://${req.headers.host}` }));
  } catch (e) {
    res.status(404).end();
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`validation.hyperjump.io listening on port ${port}`));
