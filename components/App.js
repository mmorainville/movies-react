var React = require('react');
var MovieForm = require('./MovieForm');
var MovieList = require('./MovieList');

module.exports = React.createClass({
    getInitialState: function () {
        return {selectedMovie: {}};
    },

    handleMovieClick: function (movie) {
        console.log(movie);
        this.setState({selectedMovie: movie});
    },

    render: function () {
        return (
            <div>
                <MovieForm movie={this.state.selectedMovie}/>
                <MovieList url="http://localhost:3000/movies" onMovieClick={this.handleMovieClick}/>
            </div>
        );
    }
});