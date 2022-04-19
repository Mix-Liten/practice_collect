const list = document.querySelector('.list')
const listItems = document.querySelectorAll('.item')
// menuToggle.onclick = function () {
//   navigation.classList.toggle('active')
// }

const activeLink = (e) => {
  const target = e.target
  if (target.classList.contains('active')) return
  listItems.forEach(item => {
    item.classList.remove('active')
  })
  target.classList.add('active')
}

list.addEventListener('click', activeLink)
