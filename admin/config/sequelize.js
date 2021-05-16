const Sequelize = require("sequelize");
const { mysql } = require("./env");
const chalk = require("chalk");
const consola = require("consola");
console.log(chalk.blue("Hello world!"));

// 配置数据库连接
const sequelize = new Sequelize(mysql.dbname, mysql.username, mysql.password, {
  host: mysql.host, // 根路径
  port: mysql.port, // 端口号
  dialect: "mysql", // 衔接数据库类型
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: "+08:00",
  operatorsAliases: false,
});

sequelize
  .authenticate()
  .then(() => {
    consola.success(chalk.blue("数据库连接成功！"));
  })
  .catch((err) => {
    consola.error(chalk.red("数据库连接失败：", err));
  });

// 同步数据库模型到数据库
sequelize
  .sync({ logging: mysql.logging })
  .then(() => consola.success(chalk.blue("同步数据库模型成功...")));

// 公用一个静态变量实例，提升性能
module.exports = sequelize;
