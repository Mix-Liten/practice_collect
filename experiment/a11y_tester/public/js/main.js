const formEle = document.getElementById('form')
const urlEle = document.getElementById('url')
const loaderEle = document.getElementById('loader')
const issueEle = document.getElementById('issue')

// Fetch accessibility issues
const testAccessibility = async e => {
  e.preventDefault()
  const url = urlEle.value
  if (!url) {
    alert('Please add a url!')
    return
  }
  setLoading()
  const response = await fetch(`/api/a11y?url=${url}`)
  if (response.status !== 200) {
    setLoading(false)
    alert('Something went wrong!')
    return
  }
  const { issues } = await response.json()
  addIssuesToDOM(issues)
  setLoading(false)
}

// Add issues to DOM
const addIssuesToDOM = issues => {
  issueEle.innerHTML = ''
  if (!issues.length) {
    issueEle.innerHTML = '<h4>No Issues Found</h4>'
    return
  }
  issues.forEach(issue => {
    const output = `
    <div class="card mb-5">
      <div class="card-body">
        <h4>${issue.message}</h4>
        <p class="bg-light p-3 my-3">
          ${escapeHTML(issue.context)}
        </p>
        <p class="bg-secondary text-light p-3">
          CODE: ${issue.code}
        </p>
      </div>
    </div>
    `
    issueEle.innerHTML += output
  })
}

// Set loading state
const setLoading = (isLoading = true) => {
  loaderEle.style.display = isLoading ? 'block' : 'none'
}

// Escape HTML
const escapeHTML = html =>
  html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

formEle.addEventListener('submit', testAccessibility)
