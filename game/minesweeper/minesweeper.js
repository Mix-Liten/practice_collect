export const TILE_STATUSES = {
  HIDDEN: 'hidden',
  MINE: 'mine',
  ERROR_MINE: 'error_mine',
  NUMBER: 'number',
  MARKED: 'marked',
  ERROR_MARKED: 'error_marked',
  QUESTION: 'question',
}

const mines_num_color_map = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
}

export const createBoard = (boardSize, numberOfMines, startPosition) => {
  const board = []
  const minePositions = getMinePositions(boardSize, numberOfMines, startPosition)
  const { columnLen, rowLen } = boardSize
  let isLightTheme = true
  const isEven = (columnLen * rowLen) % 2 === 0
  for (let y = 0; y < rowLen; y++) {
    const row = []
    for (let x = 0; x < columnLen; x++) {
      const element = document.createElement('div')
      element.dataset.status = TILE_STATUSES.HIDDEN
      element.dataset.x = x
      element.dataset.y = y
      element.classList.add('tile')
      element.classList.add(isLightTheme ? 'light' : 'dark')
      isLightTheme = !isLightTheme

      const tile = {
        element,
        x,
        y,
        mine: minePositions.some(positionMatch.bind(null, { x, y })),
        get status() {
          return this.element.dataset.status
        },
        set status(value) {
          this.element.dataset.status = value
        },
      }

      row.push(tile)
    }
    if (isEven) isLightTheme = !isLightTheme
    board.push(row)
  }

  return board
}

export const markTile = (tile, options = {}) => {
  if (![TILE_STATUSES.HIDDEN, TILE_STATUSES.MARKED, TILE_STATUSES.QUESTION].includes(tile.status)) return

  if (tile.status === TILE_STATUSES.MARKED && options?.isEnd) {
    if (tile.mine) return
    tile.status = TILE_STATUSES.ERROR_MARKED
    return
  }

  switch (tile.status) {
    case TILE_STATUSES.HIDDEN:
      tile.status = TILE_STATUSES.MARKED
      break
    case TILE_STATUSES.MARKED:
      tile.status = TILE_STATUSES.QUESTION
      break
    case TILE_STATUSES.QUESTION:
      tile.status = TILE_STATUSES.HIDDEN
      break
  }
}

export const revealTile = (board, tile) => {
  if (![TILE_STATUSES.HIDDEN, TILE_STATUSES.QUESTION].includes(tile.status)) return

  if (tile.mine) {
    tile.status = TILE_STATUSES.MINE
    return
  }

  tile.status = TILE_STATUSES.NUMBER
  const adjacentTiles = nearbyTiles(board, tile)
  const mines = adjacentTiles.filter(t => t.mine)
  if (mines.length === 0) {
    adjacentTiles.forEach(revealTile.bind(null, board))
  } else {
    tile.element.textContent = mines.length
    tile.element.classList.add(mines_num_color_map[mines.length])
  }
}

export const checkWin = board =>
  board.every(row =>
    row.every(
      tile =>
        tile.status === TILE_STATUSES.NUMBER ||
        (tile.mine && (tile.status === TILE_STATUSES.HIDDEN || tile.status === TILE_STATUSES.MARKED)),
    ),
  )

export const checkLose = board => board.some(row => row.some(tile => tile.status === TILE_STATUSES.MINE))

const getMinePositions = (boardSize, numberOfMines, startPosition) => {
  const positions = []
  const { columnLen, rowLen } = boardSize
  const corners = [
    { x: 0, y: 0 },
    { x: columnLen - 1, y: 0 },
    { x: 0, y: rowLen - 1 },
    { x: columnLen - 1, y: rowLen - 1 },
  ]
  while (positions.length < numberOfMines) {
    const position = {
      x: randomNumber(columnLen),
      y: randomNumber(rowLen),
    }
    const isStartPosition = position.x === startPosition.x && position.y === startPosition.y
    const isCorner = corners.some(corner => positionMatch(corner, position))

    if (!isStartPosition && !isCorner && !positions.some(positionMatch.bind(null, position))) {
      positions.push(position)
    }
  }

  return positions
}

const positionMatch = (a, b) => a.x === b.x && a.y === b.y

const randomNumber = size => Math.floor(Math.random() * size)

const nearbyTiles = (board, { x, y }) => {
  const tiles = []

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board[y + yOffset]?.[x + xOffset]
      if (tile) tiles.push(tile)
    }
  }

  return tiles
}
