


var _ = require('lodash');
var React = require('react');
var og = require('./og');



var Layout = React.createClass({

    getDefaultProps: function() {
        return {
            viewPort: {
                width: 'deviceWidth',
                initialScale: '1',
                maximumScale: '1',
                userScalable: 'no'
            },
            mobile: false
        }
    },

    concatViewPort: function() {

        var viewPort = [];
        for(var key in this.props.viewPort) {
            if(this.props.viewPort.hasOwnProperty(key)) {
                viewPort.push(_.kebabCase(key) + '=' + _.kebabCase(this.props.viewPort[key]));
            }
        }

        return viewPort.join(',');
    },

    render: function() {

        var html = {
            __html: this.props.html
        };

        var openGraphElements = og.createElements(this.props.openGraph);

        var icon = null;
        if(_.isString(this.props.icon)) {
            icon = <link rel="shortcut icon" href={this.props.icon} />;
        }

        var mobile = null;
        if(this.props.mobile) {
            mobile = <meta name="viewport" content={this.concatViewPort()} />
        }

        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta charSet="utf-8" />
                    {openGraphElements}
                    {icon}
                    {mobile}
                </head>
                <body>
                    <div id="app" dangerouslySetInnerHTML={html}></div>
                </body>
            </html>
        );
    }
});

module.exports.render = function(options) {

    options = options || {};

    var docType = '<!DOCTYPE html>';
    return  docType + React.renderToStaticMarkup(<Bootstrap {...options} />);
};