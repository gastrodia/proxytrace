#!/usr/bin/env node

/**
 * Created by Yang on 2014/11/8.
 */

var http      = require('http');
var httpProxy = require('http-proxy');

var program = require('commander');
var chalk = require('chalk');

program
    .version('0.0.1')
    .option('-p, --port [name]', 'the port use for proxy server')
    .option('-t, --target [target]', 'the site you want to proxy ,for exmaple http://www.baidu.com')
    .parse(process.argv);

if(!program.port || !program.target) {
    program.help();
} else {
    main();
}




function main(){
    var proxy = httpProxy.createProxy();



    var proxyServer = http.createServer(function(req, res) {
        console.log('url: %s', req.url);
        console.log('method: %s',req.method);
        var data = '';
        req.on('data',function(chunk){
            data += chunk;
        });
        req.on('end',function(){
            console.log('data: %s',data);
        })
        proxy.web(req, res, {
            target: program.target
        });
        proxy.on('proxyRes', function (proxyRes, req, res) {
            console.log('response body:');
            console.log(res.body);
        });

    });
    proxyServer.listen(program.port);
    console.log(chalk.magenta.bold('proxytrace is listen on ' + program.port));
    console.log(chalk.magenta.bold('now proxytrace is watching the site:  ' + program.target));
}
