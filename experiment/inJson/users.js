let users = []

await fetch('./users.json')
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      return { name: user.name, email: user.email }
    })
  })

export default users
