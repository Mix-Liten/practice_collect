import React, { useState } from 'react'
import { MenuIcon, SaveIcon } from '../components/Icons'

const richestPeople = [
  { id: 1, name: 'Elon Musk', age: 50, newWorth: '2.68e+11' },
  { id: 2, name: 'Jeff Bezos', age: 58, newWorth: '1.5e+11' },
  { id: 3, name: 'Bernard Arnault', age: 73, newWorth: '1.32e+11' },
  { id: 4, name: 'Bill Gates', age: 66, newWorth: '1.27e+11' },
  { id: 5, name: 'Gautam Adani', age: 59, newWorth: '1.2e+11' },
  { id: 6, name: 'Warren Buffett', age: 91, newWorth: '1.16e+11' },
  { id: 7, name: 'Larry Page', age: 49, newWorth: '1.05e+11' },
  { id: 8, name: 'Sergey Brin', age: 48, newWorth: '1.01e+11' },
  { id: 9, name: 'Mukesh Ambani', age: 65, newWorth: '9.77e+10' },
  { id: 10, name: 'Steve Ballmer', age: 66, newWorth: '9.76e+10' },
]

const randomSort = listData => {
  return listData
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
}

// const swapItem = (data, fromIndex, toIndex) => {
//   const newData = [...data]
//   const tmp = newData[fromIndex]
//   newData[fromIndex] = newData[toIndex]
//   newData[toIndex] = tmp
//   return newData
// }

const replaceAt = (data, fromIndex, toIndex) => {
  const newData = [...data]
  const fromValue = newData.splice(fromIndex, 1)
  return [...newData.slice(0, toIndex), ...fromValue, ...newData.slice(toIndex)]
}

const Home = () => {
  const [peopleList, setPeopleList] = useState(randomSort(richestPeople))
  const [status, setStatus] = useState({ rightList: [], wrongList: [] })
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const [dragStartIndex, setDragStartIndex] = useState(null)

  const dragStart = index => {
    setDragStartIndex(index)
  }
  const dragOver = e => {
    e.dataTransfer.dropEffect = 'move'
    e.preventDefault()
  }
  const dragDrop = index => {
    const newData = replaceAt(peopleList, dragStartIndex, index)
    setPeopleList(newData)
    setDragOverIndex(null)
    setDragStartIndex(null)
  }
  // const dragDrop = index => {
  //   const newData = swapItem(peopleList, dragStartIndex, index)
  //   setPeopleList(newData)
  //   setDragOverIndex(null)
  //   setDragStartIndex(null)
  // }
  const dragEnter = index => {
    if (index === dragStartIndex) {
      setDragOverIndex(null)
      return
    }
    setDragOverIndex(index)
  }
  const dragLeave = e => {
    e.preventDefault()
  }

  const checkOrder = () => {
    const [rightList, wrongList] = [[], []]
    peopleList.forEach((listItem, index) => {
      if (index + 1 === listItem.id) {
        rightList.push(listItem.id)
        return
      }
      wrongList.push(listItem.id)
    })
    setStatus({ rightList, wrongList })
  }
  return (
    <div className="container">
      <h1>10 Richest People</h1>
      <p>Drag and drop the items into their corresponding spots</p>
      <ul id="draggable-list" className="draggable-list">
        {peopleList.map((person, index) => (
          <li
            key={person.id}
            className={[
              status.rightList.includes(person.id) ? 'right' : '',
              status.wrongList.includes(person.id) ? 'wrong' : '',
              dragStartIndex === index ? 'dragging' : '',
              dragOverIndex === index ? 'over' : '',
            ]
              .filter(v => v)
              .join(' ')}
            onDragOver={dragOver}
            onDrop={() => dragDrop(index)}
            onDragEnter={() => dragEnter(index)}
            onDragLeave={dragLeave}
          >
            <span className="number">{index + 1}</span>
            <div
              className="draggable"
              draggable
              onDragStart={e => {
                e.dataTransfer.dropEffect = 'move'
                dragStart(index)
              }}
            >
              <p className="person-name">{person?.name}</p>
              <MenuIcon />
            </div>
          </li>
        ))}
      </ul>
      <button id="check" className="check-btn" onClick={() => checkOrder()}>
        <span>Check Order</span>
        <SaveIcon />
      </button>
    </div>
  )
}

export default Home
