/**
 * 设置定时任务
 * https://www.npmjs.com/package/node-schedule
 */

const schedule = require("node-schedule");

const scheduleList = function () {
  require('./backupDB');
};

module.exports = scheduleList();
