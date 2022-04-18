const btn = document.querySelector('.btn')
const clip = document.querySelector('.clip')
const closeBtn = document.querySelector('.close')
const video = document.querySelector('video')

btn.onclick = function () {
  btn.classList.add('active')
  clip.classList.add('active')
  video.play()
  video.currentTime = 0
}

closeBtn.onclick = function () {
  btn.classList.remove('active')
  clip.classList.remove('active')
  video.pause()
}
