var React = require('react');
var CommentBox = require('./CommentBox');

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <CommentBox url="http://localhost:3000/posts"/>
            </div>
        );
    }
});