const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close')

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

function linkAction(evt) {
  if (evt.target && evt.target.matches('a.nav__link')) {
    navMenu.classList.remove('show-menu')
  }
}
navMenu.addEventListener('click', linkAction)

// ScrollReveal animation
const sr = ScrollReveal({
  distance: '90px',
  duration: 3000,
})

sr.reveal(`.home__data`, { origin: 'top', delay: 400 })
sr.reveal(`.home__img`, { origin: 'bottom', delay: 600 })
sr.reveal(`.home__footer`, { origin: 'bottom', delay: 800 })
