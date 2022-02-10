import { TILE_STATUSES, createBoard, markTile, revealTile, checkWin, checkLose } from './minesweeper.js'

const MODE_SETTING = {
  // DEBUG: { size: { columnLen: 8, rowLen: 6 }, mines: 10 },
  EASY: { size: { columnLen: 10, rowLen: 8 }, mines: 10 },
  WINDOWS_EASY: { size: { columnLen: 9, rowLen: 9 }, mines: 10 },
  NORMAL: { size: { columnLen: 18, rowLen: 14 }, mines: 40 },
  WINDOWS_NORMAL: { size: { columnLen: 16, rowLen: 16 }, mines: 40 },
  HARD: { size: { columnLen: 24, rowLen: 20 }, mines: 99 },
  WINDOWS_HARD: { size: { columnLen: 30, rowLen: 16 }, mines: 99 },
  CUSTOM: {}, // 自訂限制為，最小8×8到最大30×24，地雷最少10，最多為((長 − 1) × (寬 − 1))
}

const GLOBAL_STATE = {
  MODE: 'NORMAL',
}

const PRIVATE_STATE = {
  time: 0,
  timer: null,
}

const Private_SETTING = {
  BOARD: [],
  BOARD_SIZE: MODE_SETTING[GLOBAL_STATE.MODE].size,
  NUMBER_OF_MINES: MODE_SETTING[GLOBAL_STATE.MODE].mines,
}

const bodyElement = document.body
const boardElement = document.querySelector('.board')
const subtextElement = document.querySelector('.subtext')
const minesLeftElement = document.querySelector('[data-mine-count]')
const timeElement = document.querySelector('[data-time-count]')
const resultElement = document.querySelector('[data-result]')
const levelTextElement = document.querySelector('.level span')
const levelSelectorElement = document.querySelector('.manager select')
const customFormElement = document.querySelector('.manager .custom_form')
const formElement = document.querySelector('.manager form')

const init = () => {
  window.GLOBAL_STATE = GLOBAL_STATE
  boardElement.addEventListener('click', clickTileHandler)
  boardElement.addEventListener('contextmenu', contextmenuTileHandler)
  resultElement.addEventListener('click', () => resetGame())
  startGame()
  wrapperSubtext()
  initManager()
}

const startGame = () => {
  const mode = GLOBAL_STATE.MODE
  const BOARD_SIZE = MODE_SETTING[mode].size
  Private_SETTING.BOARD_SIZE = BOARD_SIZE
  const NUMBER_OF_MINES = MODE_SETTING[mode].mines
  Private_SETTING.NUMBER_OF_MINES = NUMBER_OF_MINES
  minesLeftElement.textContent = NUMBER_OF_MINES
  buildBoard()
  const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
  Private_SETTING.BOARD = board
  board.forEach(row => {
    row.forEach(tile => {
      boardElement.append(tile.element)
    })
  })
}

const resetGame = () => {
  boardElement.innerHTML = ''
  boardElement.removeEventListener('click', stopProp, { capture: true })
  boardElement.removeEventListener('contextmenu', stopProp, { capture: true })
  resultElement.textContent = '🙂'
  levelTextElement.textContent = GLOBAL_STATE.MODE
  startGame()
  wrapperSubtext()
  resetTimer()
  timeElement.textContent = PRIVATE_STATE.time.toString().padStart(4, '0')
}

const clickTileHandler = e => {
  if (!e.target.classList.contains('tile')) return
  if (!PRIVATE_STATE.timer) PRIVATE_STATE.timer = setInterval(timerAction, 1000)
  const { x, y } = e.target.dataset
  const tile = Private_SETTING.BOARD[y][x]
  revealTile(Private_SETTING.BOARD, tile)
  checkGameEnd(tile)
}

const contextmenuTileHandler = e => {
  e.preventDefault()
  if (!e.target.classList.contains('tile')) return
  const { x, y } = e.target.dataset
  const tile = Private_SETTING.BOARD[y][x]
  markTile(tile)
  listMinesLeft()
}

const listMinesLeft = () => {
  const markedTilesCount = Private_SETTING.BOARD.reduce((count, row) => {
    return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
  }, 0)

  minesLeftElement.textContent = Private_SETTING.NUMBER_OF_MINES - markedTilesCount
}

const checkGameEnd = lastTile => {
  const win = checkWin(Private_SETTING.BOARD)
  const lose = checkLose(Private_SETTING.BOARD)

  if (win || lose) {
    boardElement.addEventListener('click', stopProp, { capture: true })
    boardElement.addEventListener('contextmenu', stopProp, { capture: true })
    clearInterval(PRIVATE_STATE.timer)
  }

  if (win) {
    resultElement.textContent = '😎'
  }
  if (lose) {
    resultElement.textContent = '😵'
    lastTile.element.classList.add('last')
    Private_SETTING.BOARD.forEach(row => {
      row.forEach(tile => {
        if (tile.status === TILE_STATUSES.MARKED) markTile(tile, { isEnd: true })
        if (tile.mine && tile.status !== TILE_STATUSES.MARKED) revealTile(Private_SETTING.BOARD, tile)
      })
    })
  }
}

const stopProp = e => {
  e.stopImmediatePropagation()
  e.returnValue = false
}

const timerAction = () => {
  if (PRIVATE_STATE.time > 9999) PRIVATE_STATE.time = 0
  PRIVATE_STATE.time++
  timeElement.textContent = PRIVATE_STATE.time.toString().padStart(4, '0')
}

const resetTimer = () => {
  clearInterval(PRIVATE_STATE.timer)
  PRIVATE_STATE.time = 0
  PRIVATE_STATE.timer = null
}

const buildBoard = () => {
  const { columnLen, rowLen } = Private_SETTING.BOARD_SIZE
  boardElement.style.setProperty('--xLen', columnLen)
  boardElement.style.setProperty('--yLen', rowLen)
}

const wrapperSubtext = () => {
  const boardWidth = boardElement.getBoundingClientRect().width
  const defaultWidth = 450
  if (boardWidth > defaultWidth) {
    subtextElement.style.width = `${boardWidth}px`
    bodyElement.style.minWidth = `${boardWidth}px`
  } else {
    subtextElement.style.removeProperty('width')
    bodyElement.style.removeProperty('width')
  }
}

const initManager = () => {
  levelTextElement.textContent = GLOBAL_STATE.MODE
  Object.keys(MODE_SETTING).forEach(modeName => {
    const mode = MODE_SETTING[modeName]
    const optionNode = document.createElement('option')
    optionNode.value = modeName
    optionNode.textContent =
      modeName === 'CUSTOM' ? modeName : `${modeName} (${mode.size.columnLen} x ${mode.size.rowLen}, ${mode.mines}💣)`
    levelSelectorElement.appendChild(optionNode)
  })
  levelSelectorElement.value = GLOBAL_STATE.MODE
  levelSelectorElement.addEventListener('change', e => {
    if (e.target.value === 'CUSTOM') customFormElement.classList.remove('hidden')
    if (e.target.value !== 'CUSTOM') customFormElement.classList.add('hidden')
  })
  formElement.addEventListener('submit', e => {
    e.preventDefault()
    const { level, width, height, mine_nums } = e.target.elements
    setMode(level.value, {
      size: { columnLen: parseInt(width.value), rowLen: parseInt(height.value) },
      mines: parseInt(mine_nums.value),
    })
    resetGame()
  })
}

const setMode = (type, customSetting = {}) => {
  if (!Object.keys(MODE_SETTING).includes(type)) return
  if (type === 'CUSTOM') MODE_SETTING.CUSTOM = customSetting
  GLOBAL_STATE.MODE = type
}

init()
