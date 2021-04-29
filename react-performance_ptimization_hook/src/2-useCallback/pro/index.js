import React, { useState, useCallback } from 'react'
import ChildComponent from './childComponent'

const Pro = () => {
  const [localState, setLocalState] = useState(0)
  const [childComponentState, setChildComponentState] = useState(0)

  const increment = () => setLocalState(localState + 1)
  const incrementChildState = (number) => setChildComponentState(number)
  
  const memoizedCallback = useCallback((state) => incrementChildState(state), [])

  // const memoizedCallback = React.useMemo(() => (state) => incrementChildState(state), [])

  return (
    <div>
      <ChildComponent
        number={childComponentState}
        setNumber={memoizedCallback}
      />

      <h1>Parent component: {localState}</h1>
      <button onClick={increment}>Up localState</button>
    </div>
  )
}


export default Pro
