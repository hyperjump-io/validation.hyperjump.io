const http = require("http");
const send = require("koa-send");
const Koa = require("koa");
const app = new Koa();

const year = 31536000000;

app.use(async ctx => {
  ctx.type = "application/reference+json";
  await send(ctx, ctx.path + ".json", { maxage: year, immutable: true });
});

const port = process.env.PORT || 3000;
http.createServer(app.callback()).listen(port);
