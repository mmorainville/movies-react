var React = require('react');
var update = require('react-addons-update');
var ViewingsForm = require('./ViewingsForm');
var MultipleInputs = require('./MultipleInputs');

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

        // this.props.onMovieSubmit(this.state);

        // delete this.state.id;

        console.log("POST");

        // Set token if user is logged in
        var access_token = "";
        if (localStorage.getItem('access_token')) {
            access_token = "?access_token=" + localStorage.getItem('access_token');
        }

        $.ajax({
            url: 'http://localhost:3000/api/movies' + access_token,
            dataType: 'json',
            cache: false,
            type: 'put',
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
            <form className="movieForm ui form" onSubmit={this.handleSubmit}>

                <div className="equal width fields">
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

                <div className="equal width fields">
                    <div className="field">
                        <label>ID</label>
                        <input type="text" value={this.state.id} onChange={this.handleChange.bind(this, "id")}/>
                    </div>
                    <div className="field">
                        <label>Poster</label>
                        <input type="text" value={this.state.poster}
                               onChange={this.handleChange.bind(this, "poster")}/>
                    </div>
                </div>

                <MultipleInputs inputs={this.state.directors} inputsGroup="directors"
                                onMultipleInputChange={this.handleMultipleInputChange.bind(this, "directors")}/>

                <ViewingsForm viewings={this.state.viewings} onViewingChange={this.handleViewingChange}/>

                <div className="ui divider"></div>

                <input className="ui positive button" type="submit" value="Post"/>
            </form>
        );
    }
});