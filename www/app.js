var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var crypto = require('crypto');

var app = express();

/*============================================
EJS라는 뷰 템플릿 엔진을 사용하도록 설정하겠습니다.
============================================*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// /public 경로에 파비콘을 저장한 뒤 주석을 해제하세요
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // 로깅 미들웨어
app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 정적 리소스 미들웨어
app.use(session({
  key : 'kdevkr',
  secret : 'secret',
  cookie : {
    maxAge : 1000 * 60 * 60
  }
}));

/*============================================
라우터 모듈을 통해서 각 컨트롤러를 모듈화 해서 사용하시면 됩니다.
============================================*/
var IndexController = require('./routes/IndexController');
var AdminController = require('./routes/AdminController');

app.use('/', IndexController);
app.use('/admin', AdminController);

/*============================================
에러에 대한 핸들러를 구성하도록 합니다.
request 객체에 xhr헤더에 대한 정보가 있을 경우에는 JSON형식으로 응답하고
정보가 없다면 에러 페이지를 렌더링하여 보여주게 됩니다.
============================================*/
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  if(req.xhr){
    res.json({
      status : err.status,
      message : err.message})
  }else{
    res.render('error');
  }
});

/*============================================
구성된 애플리케이션 설정을 외부에서 호출할 수 있도록 모듈에 추가합니다.
============================================*/
module.exports = app;
