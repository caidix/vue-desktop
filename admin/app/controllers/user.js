const login = async function (ctx, next) {
  let post = ctx.request.body;

  let res_user = await dao.list({
    phone: post.phone,
    password: post.password,
  });

  if (res_user.count > 0) {
    ctx.session.user = {
      id: res_user.rows[0].id,
      username: res_user.rows[0].username,
      phone: res_user.rows[0].phone,
    };

    ctx.body = {
      code: 0,
      msg: "登录成功",
      data: null,
    };
  } else {
    ctx.session.user = null;

    ctx.body = {
      code: 1,
      msg: "账号密码不匹配",
      data: null,
    };
  }
};
const text = async function (ctx, next) {
  ctx.body = {
    code: 0,
    msg: "登录成功",
    data: null,
  };
};
module.exports = {
  login,
  text,
};
