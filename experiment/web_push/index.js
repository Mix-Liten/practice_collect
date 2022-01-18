const express = require('express')
const app = express()
require('dotenv').config()
const PORT = 3000
const webPush = require('web-push')

app.use(express.static(__dirname + '/public'))

// demo 版，暫存在記憶體
const tokens = []

app.post('/add', express.json(), (req, res) => {
  tokens.push(req.body)
  res.end()
})

app.get('/push', (req, res) => {
  const { title, content } = req.query
  webPush.setVapidDetails(`mailto:${process.env.email}`, process.env.publicKey, process.env.privateKey)
  tokens.forEach(token => {
    const sendData = {
      title: title || '預設標題',
      content: content || '預設內容'
    }
    webPush.sendNotification(token, JSON.stringify(sendData)).catch((err) => {
      console.log('Server 推播失敗', err);
    })
  })
  res.end()
})

app.listen(PORT, () => `server is runnung on ${PORT} port...`)
