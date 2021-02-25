var express = require('express');
var router = express.Router();

router.get('/search', function (req, res) {
    res.render('search');
});
router.post('/searchList', function (req, res) {
    console.log(req.body);
    //轉網址
    res.redirect('search');
})

module.exports = router;