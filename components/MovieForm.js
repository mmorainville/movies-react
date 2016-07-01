var React = require('react');
var createFragment = require('react-addons-create-fragment');

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

var MultipleStringInputs = React.createClass({
    onChangeInput: function (elem) {
        console.log(this.props.stringArray);
    },

    render: function () {
        var inputs = this.props.stringArray.map(function (input) {
            console.log(input);
            return (
            <input
                type="text"
                placeholder="Search..."
                value={input}
                key={input}
                onChange={this.onChangeInput(input)}
            />
            );
        }, this);

        return (
            <div>
                {inputs}
            </div>
        )
    }
});

module.exports = React.createClass({
    getInitialState: function () {
        return {title: '', year: ''};
    },
    handleAuthorChange: function (e) {
        this.setState({title: e.target.value});
    },
    handleTextChange: function (e) {
        this.setState({year: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var year = this.state.year.trim();
        var viewings = this.state.viewings;
        if (!year || !title) {
            return;
        }
        this.props.onCommentSubmit({title: title, year: year, viewings: viewings});
        this.setState({title: '', year: ''});
    },
    handleAddObject: function (object) {
        this.setState({title: this.state.title, year: this.state.year, directors: this.state.directors, viewings: object})
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps.movie);
    },

    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <p>{this.props.movie.title}</p>
                <pre>{JSON.stringify(this.props, null, 2)}</pre>
                <input
                    type="text"
                    placeholder="Your name"
                    value={this.state.title}
                    onChange={this.handleAuthorChange}
                />
                <input
                    type="text"
                    placeholder="Say something..."
                    value={this.state.year}
                    onChange={this.handleTextChange}
                />
                <MultipleStringInputs stringArray={this.state.directors || []}/>
                {/*<CustomInputs onAddObject={this.handleAddObject}/>*/}
                <input type="submit" value="Post"/>
            </form>
        );
    }
});