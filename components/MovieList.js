var React = require('react');
var $ = require("jquery");

var Movie = React.createClass({
    handleMovieClick: function (e) {
        this.props.onMovieClick(this.props.movie);
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

    handleMovieClick: function (movie) {
        this.props.onMovieClick(movie);
    },

    render: function () {
        var self = this;

        var movieNodes = this.state.data.map(function (movie) {
            return (
                <Movie movie={movie} key={movie.id} onMovieClick={self.handleMovieClick}/>
            );
        });

        return (
            <div className="movieList">
                {movieNodes}
            </div>
        );
    }
});