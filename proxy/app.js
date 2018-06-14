var http = require("http");
var httpProxy = require("http-proxy");

var proxy = httpProxy.createProxyServer({});

var proxySever = http.createServer((req,res) => {
    proxy.web(req,res,{
        target: 'http://123.206.82.241:8080'
    });
});

proxySever.listen(8088, () => {
    console.log("proxy server is running");
});