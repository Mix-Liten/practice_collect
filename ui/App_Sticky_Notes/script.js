let createBox = document.getElementsByClassName('createBox')[0]
let notes = document.getElementsByClassName('notes')[0]
let createArea = document.getElementById('create')
let content = document.getElementById('content')
let i = 0

createBox.addEventListener('keydown', createNote)

notes.addEventListener('dblclick', e => {
  let { target } = e
  if (createArea.contains(target)) return
  let targetIsNote = false
  let times = 3
  while (times > 0) {
    if (target.classList.contains('note')) {
      targetIsNote = true
      break
    }
    target = target.parentElement
    times--
  }
  if (targetIsNote) {
    target.remove()
  }
})

document.getElementById('create').addEventListener('click', () => {
  createBox.style.display = 'block'
  createBox.getElementsByTagName('textarea')[0].focus()
})

function createNote(e) {
  if (e.keyCode === 27) {
    content.value = ''
    createBox.style.display = 'none'
    return
  }
  if (e.keyCode === 13) {
    if (content.value.length) {
      insertNote(content.value)
      content.value = ''
    }
    createBox.style.display = 'none'
  }
}

function insertNote(txt) {
  let note = document.createElement('div')
  note.className = 'note'
  note.innerHTML = `<div class="details"><p>${txt}</p></div>`
  note.style.backgroundColor = getColor()

  notes.appendChild(note)
}

function getColor() {
  let colors = ['#c2ff3d', '#ff3de8', '#3dc2ff', '#04e022', '#ebb328', '#bc83e6']
  if (i + 1 > colors.length) i = 0
  return colors[i++]
}
