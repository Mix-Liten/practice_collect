const Document = require('../models/Document')

const index = (req, res) => {
  const variables = {
    title: 'Hastebin',
    language: 'plaintext',
    code: `Welcome to HasteBin! \n
Use the commands in the top right corner
to create a new file to share with others.
  `,
  }
  res.render('show', variables)
}

const create = async (req, res) => {
  const id = req.params.id
  if (!id) {
    res.render('create', { title: 'Hastebin | Create' })
    return
  }

  try {
    const document = await Document.findById(id)
    res.render('create', { title: 'Hastebin | Create', content: document.content })
  } catch (err) {
    res.redirect('/')
  }
}

const store = async (req, res) => {
  const content = req.body.content
  try {
    const document = await Document.create({ content })
    res.redirect(`/show/${document.id}`)
  } catch (err) {
    res.render('create', { title: 'Hastebin | Create', content })
  }
}

const show = async (req, res) => {
  const id = req.params.id
  try {
    const document = await Document.findById(id)
    res.render('show', { title: 'Hastebin | Show', code: document.content, id })
  } catch (err) {
    res.redirect('/')
  }
}

module.exports = {
  index,
  create,
  store,
  show,
}
