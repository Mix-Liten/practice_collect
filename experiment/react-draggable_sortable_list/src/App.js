import { useState, useEffect } from 'react'
import { MenuIcon, SaveIcon, StarIcon, TruthyIcon, FalslyIcon } from './components/Icons'
import richestPeople from './constants/richestPeople'
import useGame from './hooks/useGame'
import useDrag from './hooks/useDrag'
// import { inRange } from './utils'

const Home = () => {
  const [gameState, gameDispatch] = useGame(richestPeople)
  const [dragState, dragDispatch] = useDrag()
  const [transition, setTransition] = useState({ isStart: false, isPositive: false })

  useEffect(() => {
    if (!transition.isStart) return
    if (dragState.startIndex == null) setTransition({ ...transition, isStart: false })
  }, [transition, dragState.startIndex])

  const dragStart = index => {
    if (transition.isStart) return
    dragDispatch({ type: 'EVENT_DRAG_START', payload: { index } })
  }
  const dragOver = e => {
    if (transition.isStart) return
    e.dataTransfer.dropEffect = 'move'
    e.preventDefault()
  }
  const dragDrop = async index => {
    if (transition.isStart) return
    if (gameState.isChecked) gameDispatch({ type: 'EVENT_RESTART' })
    gameDispatch({ type: 'CHANGE_LISTDATA', payload: { fromIndex: dragState.startIndex, toIndex: index } })
    setTransition({ isStart: true, isPositive: dragState.startIndex < index })
    await new Promise(resolve => setTimeout(resolve, 950))
    dragDispatch({ type: 'EVENT_DRAG_DROP' })
  }
  const dragEnter = index => {
    if (transition.isStart) return
    if (index === dragState.startIndex) {
      dragDispatch({ type: 'EVENT_DRAG_ENTER', payload: { index: null } })
      return
    }
    dragDispatch({ type: 'EVENT_DRAG_ENTER', payload: { index } })
  }
  const dragLeave = e => {
    e.preventDefault()
  }

  const checkOrder = () => {
    const [rightList, wrongList] = [[], []]
    gameState.listData.forEach((item, index) => {
      if (index + 1 === item.id) {
        rightList.push(item.id)
        return
      }
      wrongList.push(item.id)
    })
    gameDispatch({ type: 'CHANGE_STATUS', payload: { rightList, wrongList } })
  }

  const switchMode = () => {
    gameDispatch({ type: 'CHANGE_MODE' })
  }

  return (
    <div className="container">
      <h1>10 Richest People</h1>
      <p>Drag and drop the items into their corresponding spots</p>
      <p>{transition ? 'true' : 'false'}</p>
      <button className={`btn cheat-btn ${gameState.isCheatMode ? 'open' : 'close'}`} onClick={() => switchMode()}>
        <span>{gameState.isCheatMode ? 'close' : 'open'} cheat mode</span>
        <StarIcon />
      </button>
      <ul id="draggable-list" className="draggable-list">
        {gameState.listData.map((item, index) => (
          <li
            key={item.id}
            className={
              [
                gameState.rightList.includes(item.id) && 'right',
                gameState.wrongList.includes(item.id) && 'wrong',
                dragState.startIndex === index && 'dragging',
                dragState.overIndex === index && 'over',
              ]
                .filter(v => v)
                .join(' ') || null
            }
            onDragOver={dragOver}
            onDrop={() => dragDrop(index)}
            onDragEnter={() => dragEnter(index)}
            onDragLeave={dragLeave}
          >
            <span className="number">{index + 1}</span>
            <div
              className={
                [
                  'draggable',
                  transition.isStart &&
                    dragState.overIndex !== null &&
                    transition.isPositive &&
                    (dragState.overIndex === index || dragState.startIndex === index) &&
                    'fly-up',
                  transition.isStart &&
                    dragState.overIndex !== null &&
                    !transition.isPositive &&
                    (dragState.overIndex === index || dragState.startIndex === index) &&
                    'fly-down',
                ]
                  .filter(v => v)
                  .join(' ') || null
              }
              style={
                transition.isStart && dragState.overIndex !== null
                  ? {
                      '--r':
                        dragState.overIndex === index
                          ? transition.isPositive
                            ? index - dragState.startIndex
                            : dragState.startIndex - index
                          : transition.isPositive
                          ? index - dragState.overIndex
                          : dragState.overIndex - index,
                    }
                  : null
              }
              draggable
              onDragStart={e => {
                e.dataTransfer.dropEffect = 'move'
                dragStart(index)
              }}
            >
              {gameState.isCheatMode ? (
                <>
                  <a
                    href={`https://en.wikipedia.org/wiki/${item.name.replace(' ', '_')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </a>
                  <span>Net Worth: ${item.netWorth}</span>
                </>
              ) : (
                <p className="person-name">{item.name}</p>
              )}
              {gameState.rightList.includes(item.id) ? (
                <TruthyIcon />
              ) : gameState.wrongList.includes(item.id) ? (
                <FalslyIcon />
              ) : (
                <MenuIcon />
              )}
            </div>
          </li>
        ))}
      </ul>
      <button className="btn check-btn" onClick={() => checkOrder()}>
        <span>Check Order</span>
        <SaveIcon />
      </button>
    </div>
  )
}

export default Home
