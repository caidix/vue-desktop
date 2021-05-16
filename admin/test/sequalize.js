const express = require('express')
const bodyParser = require('body-parser')
const {services} = require('./sequalize-database/index')

const app = express()

// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());


app.get('/', (req, res) => {
  res.send('首页')
})

// 获取列表
app.get('/user', async (req, res) => {
  const result = await services.User.getAllUsers({})

  res.send(result)
})

// 获取一个
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id
  if(!userId) {
    res.send('error id not found')
    return;
  }
  const result = await services.User.getUserById(userId)
  res.send(result)
})

// 增加
app.post('/user', async (req, res) => {
  const result = await services.User.addUser(req.body)

  res.send(result)
  // res.send('用户页post\n')
})

// 修改
app.put('/user/:id', async (req, res) => {
  // console.log(req.params.id)
  const result = await services.User.updateUser(req.params.id, req.body)

  res.send(result)
})

// 删除
app.delete('/user/:id', async (req, res) => {
  try {
    const result = await services.User.deleteUserById(req.params.id)
    if(result === 1) {
      res.send('delete success')
    } else {
      res.send('delete fail')
    }   
  } catch(e) {
    res.send(e)
  }
})

app.listen(3004, () => {
  console.log(`express-server started at 3004`)
})