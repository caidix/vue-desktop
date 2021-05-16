const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const Koa = require("koa");
var cors = require("koa2-cors");
let env = require("../config/env");
const app = new Koa();
app.use(cors());
app.keys = ["keys", "keykeys"];
app.use(
  session({
    store: redisStore({
      // Options specified here
      host: env.redis.host,
      port: env.redis.port,
    }),
  })
);

app.use(function* () {
  console.log(this.path,this.session)
  switch (this.path) {
    case "/":
      get.call(this);
      break;
    case "/remove":
      remove.call(this);
      break;
    case "/regenerate":
      yield regenerate.call(this);
      break;
  }
});

function get() {
  const session = this.session;
  session.count = session.count || 0;
  session.count++;
  this.body = session.count;
  console.log(this.body)
}

function remove() {
  this.session = null;
  this.body = 0;
}

function* regenerate() {
  get.call(this);
  yield this.regenerateSession();
  get.call(this);
}

app.listen(8080, () => {
  console.log("success");
});
