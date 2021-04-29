import React, { useState } from 'react'
import ChildComponent from './childComponent'

const Pro = () => {
  const [localState, setLocalState] = useState(0)
  const [childComponentState] = useState(0)

  const increment = () => setLocalState(localState + 1)

  return (
    <div>
      <ChildComponent number={childComponentState} />

      <h1>Parent component: {localState}</h1>
      <button onClick={increment}>Up localState</button>
    </div>
  )
}


export default Pro
