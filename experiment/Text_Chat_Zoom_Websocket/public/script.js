const chatFormEle = document.getElementById('chat-form')
const chatMessagesEle = document.querySelector('.chat-messages')
const roomNameEle = document.getElementById('room-name')
const userListEle = document.getElementById('users')
const messageTemplate = document.querySelector('[data-message]')

// Get username and room from URL
const params = new URLSearchParams(window.location.search)
const roomSetting = {
  username: params.get('username'),
  room: params.get('room'),
}

const socket = io()

// Join chatroom
socket.emit('joinRoom', roomSetting)

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room)
  outputUsers(users)
})

// Message from server
socket.on('message', (message) => {
  // console.log(message)
  outputMessage(message)
  // Scroll down
  chatMessagesEle.scrollTop = chatMessagesEle.scrollHeight
})

// Message submit
chatFormEle.addEventListener('submit', (e) => {
  e.preventDefault()
  // Get message text
  let msg = e.target.elements.msg.value.trim()
  if (!msg) return
  // Emit message to server
  socket.emit('chatMessage', msg)
  // Clear input
  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})

// Output message to DOM
function outputMessage(message) {
  const [newMessageEle] = messageTemplate.content.cloneNode(true).children
  const [metaEle, textEle] = newMessageEle.children
  metaEle.textContent = message.username
  const timeEle = document.createElement('span')
  timeEle.textContent = message.time
  metaEle.appendChild(timeEle)
  textEle.textContent = message.text
  chatMessagesEle.appendChild(newMessageEle)
}

// Add room name to DOM
function outputRoomName(room) {
  roomNameEle.textContent = room
}

// Add users to DOM
function outputUsers(users) {
  userListEle.innerHTML = ''
  users.forEach((user) => {
    const li = document.createElement('li')
    li.innerHTML = '<i class="fas fa-user"></i>'
    li.append(user.username)
    userListEle.appendChild(li)
  })
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const isOff = confirm('Are you sure you want to leave the chatroom?')
  if (isOff) {
    window.location = '../index.html'
  }
})
