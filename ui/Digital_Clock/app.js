const hours = document.getElementById('hours')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const ampm = document.getElementById('ampm')
const hh = document.getElementById('hh')
const mm = document.getElementById('mm')
const ss = document.getElementById('ss')
const hr_dot = document.querySelector('.hr_dot')
const min_dot = document.querySelector('.min_dot')
const sec_dot = document.querySelector('.sec_dot')

setInterval(() => {
  let h = new Date().getHours()
  let m = new Date().getMinutes()
  let s = new Date().getSeconds()
  const am = h >= 12 ? 'PM' : 'AM'

  // convert 24hr clock to 12hr clock
  if (h > 12) h = h - 12

  hours.innerHTML = `
  ${h.toString().padStart(2, '0')}
  <br />
  <span>Hours</span>
  `
  minutes.innerHTML = `
  ${m.toString().padStart(2, '0')}
  <br />
  <span>Minutets</span>
  `
  seconds.innerHTML = `
  ${s.toString().padStart(2, '0')}
  <br />
  <span>Seconds</span>
  `
  ampm.innerHTML = am

  // 12 hrs
  hh.style.strokeDashoffset = 440 - (440 * h) / 12
  // 60 minutes
  mm.style.strokeDashoffset = 440 - (440 * m) / 60
  // 60 seconds
  ss.style.strokeDashoffset = 440 - (440 * s) / 60

  // 360deg / 12 = 30deg
  hr_dot.style.transform = `rotate(${h * 30}deg)`
  // 360deg / 60 = 6deg
  min_dot.style.transform = `rotate(${m * 6}deg)`
  // 360deg / 60 = 6deg
  sec_dot.style.transform = `rotate(${s * 6}deg)`
})
