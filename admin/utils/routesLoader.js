const glob = require('glob')
module.exports = function (dirname) {
  /**
   * Promise做流程控制（resolve，reject），用reject抛出异常做异常处理
   */
  return new Promise((resolve, reject) => {
    const routes = []
    glob(`${dirname}/*.js`, { ignore: '**/index.js' }, (err, files) => {
      if (err) {
        return reject(err)
      }
      files.forEach((path) => {
        const route = require(path)
        routes.push(route)
      })
      resolve(routes)
    })
  })
}
