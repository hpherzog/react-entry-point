


var _ = require('lodash');
var React = require('react');


var Components = {};

Components.Title = React.createClass({
    render: function() {
        return <meta property="og:title" content={this.props.content} />;
    }
});

Components.Type = React.createClass({
    render: function() {
        return <meta property="og:type" content={this.props.content} />;
    }
});

Components.Image = React.createClass({
    render: function() {
        return <meta property="og:image" content={this.props.content} />;
    }
});

Components.Url = React.createClass({
    render: function() {
        return <meta property="og:url" content={this.props.content} />;
    }
});

Components.Description = React.createClass({
    render: function() {
        return <meta property="og:description" content={this.props.content} />;
    }
});


module.exports.createElements = function(options) {

    var elements = [];

    for(var option in options)
    {
        var className = _.capitalize(option);

        if(Components.hasOwnProperty(className) &&
            options.hasOwnProperty(option) &&
            _.isString(options[option]) &&
            _.trim(options[option]) !== '')
        {
            elements.push(React.createElement(Components[className], {
                key: option,
                content: options[option]
            }));
        }
    }

    return elements;
};

module.exports.Components = Components;

