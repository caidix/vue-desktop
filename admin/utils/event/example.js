const event = require("./event");

let test_event = event.on("some_event", function (data) {
  console.log("测试监听事件：" + data);
});

module.exports = test_event;
