var express = require('express');
var router = express.Router();

var database = require('../models/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 把station参数入库到数据库表version、line、station和line-station
router.get('/update/station', function(req, res, next) {
  database.paramXML.updateStation();

});

// 获取参数版本信息
router.get('/version',function(req, res, next) {
  database.version.findAll().then(data => {
      //设置response编码为utf-8
      res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
      res.end(JSON.stringify(data,null,4));
  })
});

// 获取所有线路信息
router.get('/line',function(req, res, next) {
  database.line.findAll().then(data => {
        //设置response编码为utf-8
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
        res.end(JSON.stringify(data,null,4));
    })
  });

  // 按照线路Id获取该线路的所有站点
  router.get('/line/station',function(req, res, next) {
    var param = req.query;
    database.lineStation.findAll({where:{LineId:param.Id}, order: [['SortId','ASC']]}).then(data => {
        //设置response编码为utf-8
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
        res.end(JSON.stringify(data,null,4));
    })
  });

  // 获取所有站点信息
  router.get('/station',function(req, res, next) {
    database.station.findAll().then(data => {
        //设置response编码为utf-8
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
        res.end(JSON.stringify(data,null,4));
    })
  });
  

module.exports = router;