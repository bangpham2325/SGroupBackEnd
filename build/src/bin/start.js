"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _express = _interopRequireDefault(require("express"));

var _pug = _interopRequireDefault(require("pug"));

var _path = _interopRequireDefault(require("path"));

var _routes = _interopRequireDefault(require("./routes"));

var _database = _interopRequireDefault(require("./config/database"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _env = require("./env");

var PUBLIC_PATH = _path["default"].join(__dirname, 'public');

var PORT = _env.envConfig.get('PORT'); //const authMidderware = require('./middleware/auth.middleware');


var COOKIE_SECRET = _env.envConfig.get('COOKIE_SECRET'); //connect db


(0, _database["default"])();
var app = (0, _express["default"])();
var port = 3000;
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json()); //Khai báo đường dẫn đến thư mục chứa các template

app.set('views', _path["default"].join(__dirname, 'views')); //Khai báo templateEngine sử dụng

app.set('view engine', 'pug');
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
app.use((0, _methodOverride["default"])(function (req, res) {
  if (req.body && (0, _typeof2["default"])(req.body) === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(_express["default"]["static"](PUBLIC_PATH, {
  etag: true,
  cacheControl: true,
  maxAge: 8000
}));
app.use((0, _cookieParser["default"])(COOKIE_SECRET)); //app.use(methodOverride('_method'))

app.use(_bodyParser["default"].json({
  limit: '10mb'
}));
app.use(_bodyParser["default"].urlencoded({
  limit: '10mb',
  extended: true
}));
app.use('/', _routes["default"]);
app.listen(PORT, function () {
  console.log("Example app listening at ".concat(PORT));
});