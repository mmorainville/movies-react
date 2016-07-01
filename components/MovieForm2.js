var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },
    handleTitleChange: function (e) {
        this.setState({title: e.target.value});
    },
    handleYearChange: function (e) {
        this.setState({year: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var year = this.state.year.trim();
        if (!year || !title) {
            return;
        }
        this.props.onCommentSubmit(this.state);
        this.setState({});
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps.movie);
    },

    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <pre style={{position:'absolute',right:250 + 'px'}}>{JSON.stringify(this.props, null, 2)}</pre>

                <input type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                <input type="text" value={this.state.year} onChange={this.handleYearChange}/>

                <br/>
                <input type="submit" value="Post"/>
            </form>
        );
    }
});