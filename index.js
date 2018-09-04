const http = require("http");
const send = require("koa-send");
const Koa = require("koa");
const app = new Koa();

app.use(async ctx => {
  await send(ctx, ctx.path + ".json");
});

const port = process.env.PORT || 3000;
http.createServer(app.callback()).listen(port);
