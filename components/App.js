var React = require('react');
var MovieForm = require('./MovieForm');
var MovieList = require('./MovieList');
var SemanticDropdown = require('./SemanticDropdown');

module.exports = React.createClass({
    getInitialState: function () {
        return {selectedMovie: {}};
    },

    handleMovieClick: function (movie) {
        this.setState({selectedMovie: movie});
    },

    handleCommentSubmit: function (movie) {
        this.setState({selectedMovie: movie});
    },

    handleResultSelect: function (movie) {
        // Maybe use React.addons here to merge the new state with the current state
        // and delete the "description" field
        this.setState({selectedMovie: movie});
    },

    render: function () {
        return (
            <div>
                <div className="ui borderless inverted main menu">
                    <div className="ui container">
                        <a href="#" className="header item">
                            <img className="logo" src="public/images/logo.png"/>
                            Movies
                        </a>

                        <div className="right menu">
                            <a href="#" className="item">Login</a>
                        </div>
                    </div>
                </div>

                <div className="ui grid">
                    <SemanticDropdown onResultSelect={this.handleResultSelect}/>
                    <MovieForm movie={this.state.selectedMovie} onCommentSubmit={this.handleCommentSubmit}/>
                    <MovieList url="http://localhost:3000/movies" onMovieClick={this.handleMovieClick}/>
                </div>
            </div>
        );
    }
});