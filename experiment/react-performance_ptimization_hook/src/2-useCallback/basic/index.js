import React, { useState } from 'react'
import ChildComponent from './childComponent'

const Basic = () => {
  const [localState, setLocalState] = useState(0)
  const [childComponentState, setChildComponentState] = useState(0)

  const increment = () => setLocalState(localState + 1)
  const incrementChildState = (number) => setChildComponentState(number)

  return (
    <div>
      <ChildComponent
        number={childComponentState}
        setNumber={incrementChildState}
      />

      <h1>Parent component: {localState}</h1>
      <button onClick={increment}>Up localState</button>
    </div>
  )
}


export default Basic
