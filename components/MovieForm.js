var React = require('react');
var ViewingsForm = require('./ViewingsForm');
var MultipleInputs = require('./MultipleInputs');

module.exports = React.createClass({
    getInitialState: function () {
        return this.props.movie;
    },
    handleChange: function (field, e) {
        this.setState({[field]: e.target.value}, function () {
            this.props.onCommentSubmit(this.state);
        });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var year = this.state.year.trim();
        if (!year || !title) {
            return;
        }
        this.props.onCommentSubmit(this.state);

        delete this.state.id;
        console.log("POST");

        // $.ajax({
        //     url: 'http://localhost:3000/movies',
        //     dataType: 'json',
        //     cache: false,
        //     type: 'post',
        //     contentType:"application/json; charset=utf-8",
        //     success: function (data) {
        //         console.log("success");
        //         // this.setState({data: data});
        //     }.bind(this),
        //     error: function (xhr, status, err) {
        //         console.error(this.props.url, status, err.toString());
        //     }.bind(this),
        //     data: JSON.stringify(this.state)
        // });

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

        this.setState(newState, function () {
            this.props.onCommentSubmit(this.state);
        });
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

                <input type="text" value={this.state.title} onChange={this.handleChange.bind(this, "title")}/>
                <input type="text" value={this.state.year} onChange={this.handleChange.bind(this, "year")}/>

                <br/><br/>
                <MultipleInputs inputs={this.state.directors} inputsGroup="directors"
                                onMultipleInputChange={this.handleMultipleInputChange.bind(this, "directors")}/>

                <br/><br/>
                <ViewingsForm viewings={this.state.viewings} onViewingChange={this.handleViewingChange}/>

                <br/>
                <input type="submit" value="Post"/>
            </form>
        );
    }
});