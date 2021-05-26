const Koa = require("koa");
const app = new Koa();
const config = require("config");
const consola = require("consola");
const routing = require('./routes')

// session key
app.keys = ["CD_wOw is comming and take you fly! okey, love me."];
app.context.wuwuwu = "123213";

// cors跨域配置的支持
const cors = require("koa2-cors");
app.use(
  cors({
    origin: function (ctx) {
      return "*"; // 允许来自所有域名请求,上线后请注意配置
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization", "Date"],
    maxAge: 60 * 1000 * 30,
    credentials: true,
    allowMethods: ["GET", "PUT", "POST", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Custom-Header",
      "anonymous",
    ],
  })
);

// 使用 Redis 存储 session
const session = require("koa-generic-session");
app.use(session(require("../config/session")));

// 定时任务
// require('../utils/schedule/list')

// 静态资源管理
const koaStatic = require("koa-static");
app.use(koaStatic(__dirname + "/public"));
// 引入中间件 - 例如用户列表的鉴权
// const auth = require("./middlewares/auth");
// app.use(auth)

// 文件上传支持
const body = require("koa-body");
app.use(body({ multipart: true }));

// app.use(async function (ctx, next) {
//   let ip =
//     ctx.req.headers["x-forwarded-for"] ||
//     ctx.req.remoteAddress ||
//     ctx.req.socket.remoteAddress ||
//     ctx.req.socket.remoteAddress;
//   console.log(ctx.wuwuwu);
//   console.time("serviceTime");
//   ctx.body = "首页";
//   await next();
//   console.timeEnd("serviceTime");
// });
// add route
let sequelize = require('../config/sequelize')
routing(app)

// 设置 proxy 为 true,那么就可以在请求里拿到实际 IP
app.proxy = true;

const PORT = config.get("port");
app.listen(PORT, () => {
  consola.ready(`服务器已开启： http://localhost:${PORT}/`);
});
// xml 解析的支持，并且挂载到cxt上，处理微信公众号等需要用到
// let xmlParser = require("koa-xml-body");
// app.use(xmlParser());
// app.use(function(ctx, next) {
//   ctx.xml = ctx.request.body;
//   return next();
// });
