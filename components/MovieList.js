var React = require('react');
var $ = require("jquery");

var Movie = React.createClass({
    handleMovieClick: function (e) {
        this.props.onMovieClick(this.props.movie);
    },

    handleRemoveMovie: function (movieToDeleteId) {
        console.log("DELETE " + movieToDeleteId);

        // this.props.onRemoveMovie();

        $.ajax({
            url: 'http://localhost:3000/movies/' + movieToDeleteId,
            dataType: 'json',
            cache: false,
            type: 'delete',
            success: function (data) {
                console.log("success");
                this.props.onRemoveMovie();
                // this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    render: function () {
        var directors = this.props.movie.directors.map(function (director) {
            return (
                <span key={director}>{director},</span>
            );
        });

        return (
            <div className="movie">
                <h2 className="movieTitle">
                    <a href="javascript:undefined" onClick={this.handleMovieClick}>{this.props.movie.title}
                        ({this.props.movie.year})</a>
                </h2>
                {directors}
                <button type="button" onClick={this.handleRemoveMovie.bind(null, this.props.movie.id)}>Remove movie</button>
            </div>
        );
    }
});

module.exports = React.createClass({
    getInitialState: function () {
        return {data: []};
    },

    componentDidMount: function () {
        console.log("Fetch movie list");
        this.getMovieList();
    },

    handleMovieClick: function (movie) {
        this.props.onMovieClick(movie);
    },

    handleRemoveMovie: function () {
        // Same call as in componentDidMount
        console.log("Update after remove");
        this.getMovieList();
    },

    getMovieList: function () {
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

    render: function () {
        var self = this;

        var movieNodes = this.state.data.map(function (movie) {
            return (
                <Movie movie={movie} key={movie.id} onMovieClick={self.handleMovieClick} onRemoveMovie={self.handleRemoveMovie}/>
            );
        });

        return (
            <div className="movieList">
                {movieNodes}
            </div>
        );
    }
});