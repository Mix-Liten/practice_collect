const router = require('express').Router()
const documentController = require('../controllers/documentController')

router.get('/', documentController.index)

router.get('/create/:id?', documentController.create)

router.post('/store', documentController.store)

router.get('/show/:id', documentController.show)

module.exports = router
