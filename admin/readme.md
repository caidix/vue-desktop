1. 安装 mysql 和 redis

[RedisDesktopManager](https://blog.csdn.net/bjyangyanfei/article/details/79298817)
[mysql 安装](https://dev.mysql.com/downloads/mysql/)
[mysql 安装教程](https://blog.csdn.net/weixin_48557496/article/details/113185052)
[Navicat Premium12 安装及破解教程](https://cloud.tencent.com/developer/article/1560783)

- 启动 redis （到达 redis 的目录 - cmd: redis-server.exe redis.windows.conf）

- [定时任务](https://www.npmjs.com/package/node-schedule)

### 相关插件

[config](https://www.npmjs.com/package/config)

[koa-redis](https://www.npmjs.com/package/koa-redis) 内部集成 ioredis，使用 redis 的能力存储 session

[Kue](https://www.npmjs.com/package/kue) 是 Node.js 中常用的队列库，它基于 Redis 并且让你可以用完全一致的方式让运行在同一台或不同机器上的进程间相互通信。

[Cron](https://www.npmjs.com/package/cron)应用程序通常需要定期执行一些任务。通常这种类型的操作，是通过操作系统级别的 cron 工作进行管理，也就是会调用你应用程序之外的一个单独脚本。当需要把你的应用部署到新的机器上时，这种方式会需要额外的配置工作，如果你想要自动化部署应用时，它会让人对其感到不舒服。我们可以使用 NPM 上的 cron 模块从而更轻松地实现同样的效果。它允许你在 Node.js 代码中定义 cron 工作，从而使其免于操作系统的配置。
根据上面所描述的 web/worker 进程模式，worker 进程可以通过定期调用一个函数把工作放到队列从而实现创建 cron。
使用队列可以使 cron 的实现更加清晰并且还可以利用 Kue 所提供的所有功能，如优先级，重试等。
当你的应用有多个 worker 进程时就会出现一个问题，因为同一时间所有 worker 进程的 cron 函数都会唤醒应用把多个同样重复的工作放入队列，从而导致同一个工作将会被执行多次。
为了解决这个问题，有必要识别将要执行 cron 操作的单个 worker 进程。
