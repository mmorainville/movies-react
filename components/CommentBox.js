var React = require('react');
var $ = require("jquery");

var Comment = React.createClass({
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.title}
                </h2>
                ({this.props.children})
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (movie) {
            console.log(movie);
            return (
                <Comment title={movie.title} key={movie.id}>
                    {movie.text}
                </Comment>
            );
        });

        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function () {
        return {author: '', text: ''};
    },
    handleAuthorChange: function (e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function (e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        var viewings = this.state.viewings;
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text, viewings: viewings});
        this.setState({author: '', text: ''});
    },
    handleAddObject: function (object) {
        this.setState({author: this.state.author, text: this.state.text, viewings: object})
    },

    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                />
                <input
                    type="text"
                    placeholder="Say something..."
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <CustomInputs onAddObject={this.handleAddObject}/>
                <input type="submit" value="Post"/>
            </form>
        );
    }
});

var CustomInputs = React.createClass({
    getInitialState: function () {
        this.viewingsArray = [];
        return {test1: '', test2: ''};
    },
    handleTestOneChange: function (e) {
        this.setState({test1: e.target.value});
    },
    handleTestTwoChange: function (e) {
        this.setState({test2: e.target.value});
    },
    handleAddClick: function (e) {
        console.log("click!");
        this.viewingsArray.push(this.state);
        console.log(this.viewingsArray);
        this.props.onAddObject(this.viewingsArray);
    },

    render: function () {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Your name"
                    value={this.state.test1}
                    onChange={this.handleTestOneChange}
                />
                <input
                    type="text"
                    placeholder="Say something..."
                    value={this.state.test2}
                    onChange={this.handleTestTwoChange}
                />
                <button
                    onClick={this.handleAddClick}
                >+
                </button>
            </div>
        );
    }
});


module.exports = React.createClass({
    getInitialState: function () {
        return {data: []};
    },

    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    handleCommentSubmit: function (comment) {
        console.log(comment);
//      $.ajax({
//        url: this.props.url,
//        dataType: 'json',
//        type: 'POST',
//        data: comment,
//        success: function (data) {
//          this.setState({data: data});
//        }.bind(this),
//        error: function (xhr, status, err) {
//          console.error(this.props.url, status, err.toString());
//        }.bind(this)
//      });
    },

    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});