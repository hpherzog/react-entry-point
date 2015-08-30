

require('babel/register');
var express = require('express');
var layout = require('./layout');

var app = express();

app.all('/', function(req, res){

    res.send(layout.render({
        mobile: true,
        icon: 'favicon.ico',
        openGraph: {
            description: 'sdfsfsdfsdfsdf'
        }
    }));
});

app.listen(8888);