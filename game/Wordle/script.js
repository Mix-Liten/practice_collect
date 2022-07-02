import dictionary from './assets/dictionary.json' assert { type: 'json' }
import targetWords from './assets/targetWords.json' assert { type: 'json' }

const WORD_LENGTH = 5
const FLIP_ANIMATION_DURATION = 5e2
const DANCE_ANIMATION_DURATION = 5e2
const COMPLIMENTS = ['Genius', 'Magnificent', 'Impressive', 'Splendid', 'Great', 'Phew']

const offsetFromDate = new Date(2022, 4, 1)
const msOffset = Date.now() - offsetFromDate
const dayOffset = msOffset / 1e3 / 6e1 / 6e1 / 24
const targetWord = targetWords[Math.floor(dayOffset)]

const alertContainer = document.querySelector('[data-alert-container]')
const guessGrid = document.querySelector('[data-guess-grid]')
const keyboard = document.querySelector('[data-keyboard]')

startInteraction()

function startInteraction() {
  document.addEventListener('click', handleMouseClick)
  document.addEventListener('keydown', handleKeyPress)
}

function stopInteraction() {
  document.removeEventListener('click', handleMouseClick)
  document.removeEventListener('keydown', handleKeyPress)
}

function handleMouseClick(evt) {
  if (evt.target.matches('[data-enter]')) {
    submitGuess()
    return
  }

  if (evt.target.matches('[data-delete]')) {
    deleteKey()
    return
  }

  if (evt.target.matches('[data-key]')) {
    pressKey(evt.target.dataset.key)
    return
  }
}

function handleKeyPress(evt) {
  if (evt.key === 'Enter') {
    submitGuess()
    return
  }

  if (evt.key === 'Backspace' || evt.key === 'Delete') {
    deleteKey()
    return
  }

  if (evt.key.match(/^[A-Za-z]$/)) {
    pressKey(evt.key.toLowerCase())
    return
  }
}

function getActiveTiles() {
  return guessGrid.querySelectorAll('[data-state="active"]')
}

function pressKey(key) {
  const activeTiles = getActiveTiles()
  if (activeTiles.length >= WORD_LENGTH) return
  const nextTile = guessGrid.querySelector(':not([data-letter])')
  nextTile.dataset.letter = key.toLowerCase()
  nextTile.dataset.state = 'active'
  nextTile.textContent = key
}

function deleteKey() {
  const activeTiles = getActiveTiles()
  const lastTile = activeTiles[activeTiles.length - 1]
  if (lastTile == null) return
  Reflect.deleteProperty(lastTile.dataset, 'letter')
  Reflect.deleteProperty(lastTile.dataset, 'state')
  lastTile.textContent = ''
}

function showAlert(message, duration = 1e3) {
  const alert = document.createElement('div')
  alert.innerHTML = message
  alert.classList.add('alert')
  alertContainer.prepend(alert)
  if (duration == null) return

  setTimeout(() => {
    alert.classList.add('hide')
    alert.addEventListener('transitionend', () => alert.remove())
  }, duration)
}

function shakeTiles(tiles) {
  tiles.forEach(tile => {
    tile.classList.add('shake')
    tile.addEventListener(
      'animationend',
      () => {
        tile.classList.remove('shake')
      },
      { once: true }
    )
  })
}

function flipTiles(tile, index, array, guess) {
  const letter = tile.dataset.letter
  const key = keyboard.querySelector(`[data-key="${letter}"i]`)
  setTimeout(() => {
    tile.classList.add('flip')
  }, (index * FLIP_ANIMATION_DURATION) / 2)

  tile.addEventListener(
    'transitionend',
    () => {
      tile.classList.remove('flip')
      switch (true) {
        case targetWord[index] === letter: {
          tile.dataset.state = 'correct'
          key.classList.add('correct')
          break
        }
        case targetWord.includes(letter): {
          tile.dataset.state = 'wrong-location'
          key.classList.add('wrong-location')
          break
        }
        default: {
          tile.dataset.state = 'wrong'
          key.classList.add('wrong')
          break
        }
      }

      if (index === array.length - 1) {
        tile.addEventListener(
          'transitionend',
          () => {
            startInteraction()
            checkWinLose(guess, array)
          },
          { once: true }
        )
      }
    },
    { once: true }
  )
}

function danceTiles(tiles) {
  tiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add('dance')
      tile.addEventListener(
        'animationend',
        () => {
          tile.classList.remove('dance')
        },
        { once: true }
      )
    }, (index * DANCE_ANIMATION_DURATION) / 5)
  })
}

function checkWinLose(guess, tiles) {
  if (guess === targetWord) {
    const usedRows = guessGrid.querySelectorAll('[data-letter]').length / WORD_LENGTH
    showAlert(`You Win, ${COMPLIMENTS[usedRows - 1]}!`, 5e3)
    danceTiles(tiles)
    stopInteraction()
    return
  }

  const remainingTiles = guessGrid.querySelectorAll(':not([data-letter])')
  if (remainingTiles.length === 0) {
    showAlert(`Answer is "<b>${targetWord}</b>"`, null)
    stopInteraction()
  }
}

function submitGuess() {
  const activeTiles = [...getActiveTiles()]
  if (activeTiles.length !== WORD_LENGTH) {
    showAlert('Not enough letters')
    shakeTiles(activeTiles)
    return
  }

  const guess = activeTiles.reduce((word, tile) => {
    return word + tile.dataset.letter
  }, '')

  if (!dictionary.includes(guess)) {
    showAlert('Not in word list')
    shakeTiles(activeTiles)
    return
  }

  stopInteraction()
  activeTiles.forEach((...params) => flipTiles(...params, guess))
}
