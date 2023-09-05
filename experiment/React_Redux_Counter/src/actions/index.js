export const increment = (num = 1) => {
  return {
    type: 'INCREMENT',
    payload: num,
  }
}

export const decrement = (num = 1) => {
  return {
    type: 'DECREMENT',
    payload: num,
  }
}
