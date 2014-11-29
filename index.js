/**
 * Created by Yang on 2014/11/8.
 */
/**
 * Created by yang on 14-10-28.
 */




var http      = require('http');
var httpProxy = require('http-proxy');


/*

实现方式：
 todo 是不是可以把它封装为一个命令行工具
1.host ip临时替换
2.端口代理
用法 ： ptrace 8020 https://emea.universal-api.travelport.com
 */

var proxy = httpProxy.createProxy();

var reqAnalyze = function(req){
    if(req.url.indexOf('uAPI')>-1){
        console.log('url: %s', req.url);
        console.log('method: %s',req.method);
        var data = '';
        req.on('data',function(chunk){
            data += chunk;
        });
        req.on('end',function(){
            console.log('data: %s',data);
        })
    }
}

var proxyServer = http.createServer(function(req, res) {
    reqAnalyze(req);
    proxy.web(req, res, {
        target: 'https://emea.universal-api.travelport.com'
    });
    proxy.on('proxyRes', function (proxyRes, req, res) {
        console.log('success_bak:');
        console.log(res.body);
    });
});

var port = 8020;

proxyServer.listen(port);
console.log('ProxyAttacker is listen on ' + port);
