/**
 * 子路由整合
 */
const routesLoader = require('../utils/routesLoader')
module.exports = function (app) {
  routesLoader(`${__dirname}`).then((files) => {
    files.forEach((route) => {
      app.use(route.routes()).use(
        route.allowedMethods({
          throw: false,
        })
      )
    })
  })
}
