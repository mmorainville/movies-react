var React = require('react');
var MovieForm = require('./MovieForm');
var MovieList = require('./MovieList');
var SemanticDropdown = require('./SemanticDropdown');

module.exports = React.createClass({
    getInitialState: function () {
        return {selectedMovie: {}, shouldUpdateList: false};
    },

    handleMovieClick: function (movie) {
        this.replaceState({selectedMovie: movie, shouldUpdateList: false});
    },

    handleMovieSubmit: function (movie) {
        this.replaceState({selectedMovie: movie, shouldUpdateList: false});
    },

    handleResultSelect: function (movie) {
        // Maybe use React.addons here to merge the new state with the current state
        // and delete the "description" field
        this.setState({selectedMovie: movie, shouldUpdateList: false});
    },

    handleMovieAdd: function () {
        // console.log("App: handleMovieAdd");
        this.setState({shouldUpdateList: true})
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
                    <MovieForm movie={this.state.selectedMovie} onMovieSubmit={this.handleMovieSubmit} onMovieAdd={this.handleMovieAdd}/>
                    <MovieList url="http://localhost:3000/movies" shouldUpdateList={this.state.shouldUpdateList} onMovieClick={this.handleMovieClick}/>
                </div>
            </div>
        );
    }
});