/**
 * Created by Administrator on 2016/12/7 0007.
 */
//引入path内置模块
var path = require('path');
//引入express依赖模块
var express = require('express');

//实例 express
var app = express();
//指定访问页面的路径
//__dirname 物理路径
var viewsPath = path.join(__dirname,'views');
app.use('/',express.static(viewsPath));

var publicPath = path.join(__dirname,'public');
app.use('/public',express.static(publicPath));

app.get('/login',function(req,res){
    res.send('ha ha ha')
});

//监听端口 来启动服务
app.listen(9999,function(){
    console.log('server run at port 9999');
});

//模块导出
module.exports= app;