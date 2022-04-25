import { useEffect } from 'react'

let listenerCallbacks = new WeakMap()

let observer

const handleIntersections = entries => {
  entries.forEach(entry => {
    if (listenerCallbacks.has(entry.target)) {
      let cb = listenerCallbacks.get(entry.target)

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target)
        listenerCallbacks.delete(entry.target)
        cb()
      }
    }
  })
}

const getIntersectionObserver = () => {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: '100px', // 延伸邊界，向圖片 dom 四周增加 100px 判斷範圍
      threshold: 0.15, // 臨界值，看到圖片 dom 15% 時載入
    })
  }
  return observer
}

const useIntersection = (elem, callback) => {
  useEffect(() => {
    let target = elem.current
    let observer = getIntersectionObserver()
    listenerCallbacks.set(target, callback)
    observer.observe(target)

    return () => {
      listenerCallbacks.delete(target)
      observer.unobserve(target)
    }
  }, [elem, callback])
}

export default useIntersection
