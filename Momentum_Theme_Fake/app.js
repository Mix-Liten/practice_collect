const time = document.getElementById('time')
const greeting = document.getElementById('greeting')
const name = document.getElementById('name')
const focus = document.getElementById('focus')

function showTime() {
  let today = new Date()
  let hour = today.getHours()
  let min = today.getMinutes()
  let sec = today.getSeconds()

  const AMPM = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12 || 12

  time.innerHTML = `${hour}<span>:</span>${timeAddZero(min)}<span>:</span>${timeAddZero(sec)} ${AMPM}`

  setTimeout(showTime, 1000)
}

function timeAddZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n
}

function setBgGreet() {
  let today = new Date()
  let hour = today.getHours()

  if (hour <= 12) {
    document.body.style.backgroundImage = 'url("./img/morning.jpg")'
    greeting.textContent = 'Good Morning'
  } else if (hour < 18) {
    document.body.style.backgroundImage = 'url("./img/afternoon.jpg")'
    greeting.textContent = 'Good Afternoon'
  } else {
    document.body.style.backgroundImage = 'url("./img/night.jpg")'
    greeting.textContent = 'Good Evening'
    document.body.style.color = 'white'
  }
}

function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]'
  } else {
    name.textContent = localStorage.getItem('name')
  }
}

function setName(evt) {
  if (evt.type === 'keyPress') {
    if (evt.which == 13 || evt.keyCode == 13) {
      localStorage.setItem('name', evt.target.innerText)
      name.blur()
    }
  } else {
    localStorage.setItem('name', evt.target.innerText)
  }
}

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]'
  } else {
    focus.textContent = localStorage.getItem('focus')
  }
}

function setFocus(evt) {
  if (evt.type === 'keyPress') {
    if (evt.which == 13 || evt.keyCode == 13) {
      localStorage.setItem('focus', evt.target.innerText)
      focus.blur()
    }
  } else {
    localStorage.setItem('focus', evt.target.innerText)
  }
}

name.addEventListener('keyPress', setName)
name.addEventListener('blur', setName)
focus.addEventListener('keyPress', setFocus)
focus.addEventListener('blur', setFocus)

function init() {
  showTime()
  setBgGreet()
  getName()
  getFocus()
}

init()