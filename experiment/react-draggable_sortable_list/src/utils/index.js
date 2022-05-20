const randomSort = listData => {
  return listData
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
}

const swapItem = (listData, fromIndex, toIndex) => {
  const newData = [...listData]
  const tmp = newData[fromIndex]
  newData[fromIndex] = newData[toIndex]
  newData[toIndex] = tmp
  return newData
}

const replaceAt = (listData, fromIndex, toIndex) => {
  const newData = [...listData]
  const fromValue = newData.splice(fromIndex, 1)
  return [...newData.slice(0, toIndex), ...fromValue, ...newData.slice(toIndex)]
}

const inRange = (index, { start, end }) => {
  if (start == null || end == null) return false
  return index > start && index < end
}

export { randomSort, swapItem, replaceAt, inRange }
