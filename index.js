/**
 * Created by Yang on 2014/11/8.
 */
/**
 * Created by yang on 14-10-28.
 */




var http      = require('http');
var httpProxy = require('http-proxy');


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

});

var port = 8020;

proxyServer.listen(port);
console.log('ProxyAttacker is listen on ' + port);
