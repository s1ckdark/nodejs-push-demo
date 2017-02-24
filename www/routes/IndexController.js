var express = require('express');
var router = express.Router();
var properties = require('../properties');

/*============================================
메인 페이지 라우팅 스크립트
============================================*/
router.get('/', function(req, res, next) {
  req.session.authKey = properties.key;
  res.render('index', { title: 'KdevKR Message Push System',
    contextPath : properties.path
 });
});

module.exports = router;
