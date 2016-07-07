var React = require('react');
var ReactDOM = require('react-dom');
var hljs = require('highlight.js');

module.exports = React.createClass({
    componentDidMount: function () {
        hljs.highlightBlock(ReactDOM.findDOMNode(this.refs.code));
    },

    componentDidUpdate: function () {
        hljs.highlightBlock(ReactDOM.findDOMNode(this.refs.code));
    },

    render: function () {
        return <pre><code className="json" ref="code">{JSON.stringify(this.props.json, null, 2)}</code></pre>;
    }
});