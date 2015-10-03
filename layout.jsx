


var _ = require('lodash');
var React = require('react');
var OpenGraph = require('./open-graph');



var Layout = React.createClass({

    getDefaultProps: function()
    {
        return {
            charset: 'utf-8',
            viewPort: {
                width: 'deviceWidth',
                initialScale: '1',
                maximumScale: '1',
                userScalable: 'no'
            },
            mobile: true,
            body: null
        }
    },

    concatViewPort: function()
    {
        var viewPort = [];
        for(var key in this.props.viewPort)
        {
            if(this.props.viewPort.hasOwnProperty(key))
            {
                viewPort.push(_.kebabCase(key) + '=' + _.kebabCase(this.props.viewPort[key]));
            }
        }

        return viewPort.join(',');
    },

    render: function() {

        var html = {
            __html: this.props.body
        };

        var openGraphElements = OpenGraph.createElements(this.props.openGraph);

        var icon = null;
        if(_.isString(this.props.icon)) {
            icon = <link rel="shortcut icon" href={this.props.icon} />;
        }

        var mobile = null;
        if(this.props.mobile) {
            mobile = <meta name="viewport" content={this.concatViewPort()} />
        }

        var styles = [];
        for(var i = 0; i < this.props.styles.length; i++)
        {
            styles.push(<link key={i} rel="stylesheet" href={this.props.styles[i]}></link>);
        }

        var scripts = [];
        for(var i = 0; i < this.props.scripts.length; i++)
        {
            scripts.push(<script key={i} type="text/javascript" src={this.props.scripts[i]}></script>);
        }

        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta charSet={this.props.charset} />
                    {openGraphElements}
                    {icon}
                    {mobile}
                    {styles}
                </head>
                <body>
                    <div id="app" dangerouslySetInnerHTML={html}></div>
                    {scripts}
                </body>
            </html>
        );
    }
});

module.exports.render = function(options) {

    options = options || {};

    var docType = '<!DOCTYPE html>';
    return  docType + React.renderToStaticMarkup(<Layout {...options} />);
};