var React = require('react');
var ViewingsForm = require('./ViewingsForm');
var MultipleInputs = require('./MultipleInputs');

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


    handleMultipleInputChange: function (field, newValue) {
        var newState = this.state;

        // If undefined, there is no more item so we delete the field
        if (newValue == undefined) {
            delete newState[field];
        } else {
            newState[field] = newValue;
        }

        this.setState(newState);
        this.props.onCommentSubmit(this.state);
    },

    handleViewingChange: function (viewings) {
        if (viewings.length == 0) {
            delete this.state.viewings;
        } else {
            this.setState({viewings: viewings});
        }
    },

    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <pre style={{position:'absolute',right:250 + 'px'}}>{JSON.stringify(this.props, null, 2)}</pre>

                <input type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                <input type="text" value={this.state.year} onChange={this.handleYearChange}/>

                <br/><br/>
                <MultipleInputs inputs={this.state.directors} inputsGroup="directors"
                                onMultipleInputChange={this.handleMultipleInputChange.bind(null, "directors")}/>

                <br/><br/>
                <ViewingsForm viewings={this.state.viewings} onViewingChange={this.handleViewingChange}/>

                <br/>
                <input type="submit" value="Post"/>
            </form>
        );
    }
});