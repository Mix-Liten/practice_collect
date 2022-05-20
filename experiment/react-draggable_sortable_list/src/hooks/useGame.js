import { useReducer, useEffect } from 'react'
import { randomSort, replaceAt, swapItem } from '../utils'

const INITIAL_STATE = {
  listData: [],
  rightList: [],
  wrongList: [],
  isChecked: false,
  isCheatMode: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT_LISTDATA':
      return {
        ...state,
        listData: randomSort(action.payload.data),
      }
    case 'CHANGE_LISTDATA':
      return {
        ...state,
        listData: swapItem(state.listData, action.payload.fromIndex, action.payload.toIndex),
      }
    case 'CHANGE_STATUS':
      return {
        ...state,
        rightList: action.payload.rightList,
        wrongList: action.payload.wrongList,
        isChecked: true,
      }
    case 'EVENT_RESTART':
      return {
        ...state,
        rightList: [],
        wrongList: [],
        isChecked: false,
      }
    case 'CHANGE_MODE':
      return {
        ...state,
        isCheatMode: !state.isCheatMode,
      }
    default:
      return state
  }
}

const useGame = ({ data }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  useEffect(() => {
    dispatch({ type: 'INIT_LISTDATA', payload: { data } })
  }, [data])
  return [state, dispatch]
}

export default useGame
