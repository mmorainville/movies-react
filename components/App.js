var React = require('react');
var MovieForm = require('./MovieForm');
var MovieList = require('./MovieList');

module.exports = React.createClass({
    getInitialState: function () {
        return {selectedMovie: {}};
    },

    handleMovieClick: function (movie) {
        this.setState({selectedMovie: movie});
    },

    handleCommentSubmit: function (movie) {
        this.setState({selectedMovie: movie});
        // console.log(movie);
    },

    render: function () {
        return (
            <div>
                <MovieForm movie={this.state.selectedMovie} onCommentSubmit={this.handleCommentSubmit}/>
                <MovieList url="http://localhost:3000/movies" onMovieClick={this.handleMovieClick}/>
            </div>
        );
    }
});