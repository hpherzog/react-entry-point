

require('babel/register');
var express = require('express');
var layout = require('./layout');

var app = express();

app.all('/', function(req, res){

    res.send(layout.render({
        title: 'foo',
        mobile: true,
        icon: 'favicon.ico',
        openGraph: {
            description: 'sdfsfsdfsdfsdf'
        },
        scripts: [
            'bundle1.js',
            'bundle2.js'
        ],
        styles: [
            'main.css'
        ]
    }));
});

app.listen(8888);