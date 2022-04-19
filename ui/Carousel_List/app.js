const clickAction = (e) => {
  let arrow
  if (e.target.matches('.arrow')) {
    arrow = e.target
  } else {
    arrow = e.target.closest('.arrow')
  }
  if (arrow != null) {
    arrowAction(arrow)
  }
}

const arrowAction = (arrowEle) => {
  const progressBarEle = arrowEle.closest('.row').querySelector('.progress-bar')
  const slider = arrowEle.closest('.container').querySelector('.slider')
  const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index')
  ) || 0
  const progressBarItemCount = progressBarEle.children.length
  if (arrowEle.classList.contains('arrow-prev')) {
    if (sliderIndex === 0) {
      slider.style.setProperty('--slider-index', progressBarItemCount - 1)
      progressBarEle.children[sliderIndex].classList.remove('active')
      progressBarEle.children[progressBarItemCount - 1].classList.add('active')
    } else {
      slider.style.setProperty('--slider-index', sliderIndex - 1)
      progressBarEle.children[sliderIndex].classList.remove('active')
      progressBarEle.children[sliderIndex - 1].classList.add('active')
    }
  }
  if (arrowEle.classList.contains('arrow-next')) {
    if (sliderIndex + 1 >= progressBarItemCount) {
      slider.style.setProperty('--slider-index', 0)
      progressBarEle.children[sliderIndex].classList.remove('active')
      progressBarEle.children[0].classList.add('active')
    } else {
      slider.style.setProperty('--slider-index', sliderIndex + 1)
      progressBarEle.children[sliderIndex].classList.remove('active')
      progressBarEle.children[sliderIndex + 1].classList.add('active')
    }
  }
}

document.addEventListener('click', clickAction)

const calculateProgressBar = (progressBarEle) => {
  progressBarEle.innerHTML = ''
  const slider = progressBarEle.closest('.row').querySelector('.slider')
  const itemCount = slider.children.length
  const itemsPerScreen = parseInt(getComputedStyle(slider).getPropertyValue('--items-per-screen')
  ) || 4
  let sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index')
  ) || 0
  const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen)

  if (sliderIndex >= progressBarItemCount) {
    slider.style.setProperty('--slider-index', progressBarItemCount - 1)
    sliderIndex = progressBarItemCount - 1
  }

  for (let i = 0; i < progressBarItemCount; i++) {
    const barItem = document.createElement('div')
    barItem.classList.add('progress-item')
    if (i === sliderIndex) {
      barItem.classList.add('active')
    }
    progressBarEle.append(barItem)
  }
}

function throttle(cb, delay = 1000) {
  let shouldWait = false
  let waitingArgs
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    cb(...args)
    shouldWait = true
    setTimeout(timeoutFunc, delay)
  }
}

const initProgress = throttle(() => {
  const progressBarEles = document.querySelectorAll('.progress-bar')
  progressBarEles.forEach(calculateProgressBar)
}, 250)

initProgress()

const resizeAction = () => {
  initProgress()
}

window.addEventListener('resize', resizeAction)
