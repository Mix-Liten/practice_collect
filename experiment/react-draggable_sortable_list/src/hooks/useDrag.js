import { useReducer } from 'react'

const INITIAL_STATE = {
  startIndex: null,
  overIndex: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'EVENT_DRAG_START':
      return {
        ...state,
        startIndex: action.payload.index,
      }
    case 'EVENT_DRAG_ENTER':
      return {
        ...state,
        overIndex: action.payload.index,
      }
    case 'EVENT_DRAG_DROP':
      return {
        startIndex: null,
        overIndex: null,
      }
    default:
      return state
  }
}

const useDrag = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  return [state, dispatch]
}

export default useDrag
