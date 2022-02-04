import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import http from 'http'
import express from 'express'
import { Server as wsServer } from 'socket.io'
import formatMessage from './utils/formatMessage.js'
import { userJoin, getCurrentUser, userLeave, getRoomUsers } from './utils/users.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const server = http.createServer(app)
const io = new wsServer(server)

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

const botName = 'ChatRoom Bot'

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room)

    socket.join(user.room)

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatRoom!'))

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      )

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    })
  })

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id)

    io.to(user.room).emit('message', formatMessage(user.username, msg))
  })

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id)

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      )

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      })
    }
  })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
