var React = require('react');
var update = require('react-addons-update');
var ViewingsForm = require('./ViewingsForm');
var MultipleInputs = require('./MultipleInputs');
var Highlight = require('./Highlight');

module.exports = React.createClass({
    getInitialState: function () {
        return {title: "Init", year: 2015};
    },
    handleChange: function (field, e) {
        var newState = this.state;
        if (e.target.value == "") {
            delete newState[field];
        } else {
            newState[field] = e.target.type == "number" ? parseInt(e.target.value) : e.target.value;
        }
        this.setState(newState, function () {
            this.props.onMovieSubmit(this.state);
        });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var year = this.state.year;
        if (!year || !title) {
            return;
        }

        this.props.onMovieSubmit(this.state);

        // delete this.state.id;
        console.log("POST");

        $.ajax({
            url: 'http://localhost:3000/movies',
            dataType: 'json',
            cache: false,
            type: 'post',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log("success");
                // In case of success, we reset the form
                this.props.onMovieSubmit({title: "Init2", year: 2015});
                this.props.onMovieAdd();
                // this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this),
            data: JSON.stringify(this.state)
        });

        this.setState({});
    },
    componentWillReceiveProps: function (nextProps) {
        this.replaceState(nextProps.movie);
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
            this.props.onMovieSubmit(this.state);
        });
    },

    handleViewingChange: function (viewings) {
        if (viewings == undefined) {
            // var newState = this.state;
            // delete newState.viewings;
            var newState = update(this.state, {
                viewings: {$set: undefined}
            });
            delete newState.viewings;
            this.replaceState(newState, function () {
                this.props.onMovieSubmit(this.state);
            });
        } else {
            this.setState({viewings: viewings}, function () {
                this.props.onMovieSubmit(this.state);
            });
        }
    },

    render: function () {
        return (
            <div>
                <form className="movieForm ui form" onSubmit={this.handleSubmit}>

                    <div className="inline fields">
                        <div className="field">
                            <label>ID</label>
                            <input type="text" value={this.state.id} onChange={this.handleChange.bind(this, "id")}/>
                        </div>

                        <div className="field">
                            <label>Title</label>
                            <input type="text" value={this.state.title}
                                   onChange={this.handleChange.bind(this, "title")}/>
                        </div>

                        <div className="field">
                            <label>Year</label>
                            <input type="number" value={this.state.year}
                                   onChange={this.handleChange.bind(this, "year")}/>
                        </div>
                    </div>

                    <br/><br/>
                    <MultipleInputs inputs={this.state.directors} inputsGroup="directors"
                                    onMultipleInputChange={this.handleMultipleInputChange.bind(this, "directors")}/>

                    <br/><br/>
                    <ViewingsForm viewings={this.state.viewings} onViewingChange={this.handleViewingChange}/>

                    <br/>
                    <input className="ui button" type="submit" value="Post"/>
                </form>

                <Highlight json={this.props.movie}/>
                {/*<pre>{JSON.stringify(this.props, null, 2)}</pre>*/}
            </div>
        );
    }
});