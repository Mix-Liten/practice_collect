var express = require('express');
var server = express();
var bodyParser = require('body-parser');
//載入template
var engine = require('ejs-locals');
server.engine('ejs', engine);
//跟server說樣板都放在view資料夾內
server.set('views', './views');
//跟server說使用ejs樣板語言解讀
server.set('view engine', 'ejs');
//增加靜態檔案路徑(找/images會等於public/images)
server.use(express.static('public'));

//解析body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));

//普通middleWare(守門員)用法
server.use(function (req, res, next) {
    console.log("驗證登入資訊");
    next();
});
/*也可以這樣用
var login = function (req, res, next) {
    //取得請求的網址
    var _url = req.url;
    if(_url=='/'){
        console.log('即將進入首頁');
        next();
    } else {
        res.send('驗證檢測出錯誤，即將以訪客狀態訪問首頁');
        next();
    }    
};
server.use(login);

//或這樣用在單一頁面
server.get('/', login, function (req, res) {
    res.send('<html><head></head><body><h1>title1</h1></body></html>');
});*/

//設定路由的兩種方法
server.get('/', function (req, res) {
    //使用render會從設定好的view資料夾內找到ejs檔
    res.render('index');
});

var search = require('./routes/search');
server.use('/', search);

/* //範例：http://localhost:3000/yourname?q=search&limit=20
server.get('/:userName', function (req, res) {
    var myName = req.params.userName;
    var limit = req.query.limit;
    var q = req.query.q;
    res.send('<html><head></head><body><h1>' +
        myName +
        ' 想要找關鍵字是 ' +
        q +
        ' 的前 ' +
        limit +
        ' 筆資料</h1></body></html>');
});*/

//在找不到網頁和伺服器出問題時給訪客看的頁面
server.use(function (req, res, next) {
    res.status(404).send('抱歉，這個頁面不存在')
});

server.use(function (err, req, res, next) {
    //除錯時使用
    // console.error(err.stack);
    res.status(500).send('網站出現問題，請日後嘗試')
});

//監聽 PORT

server.listen(process.env.PORT || 3000);