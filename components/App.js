var React = require('react');
var ReactDOM = require('react-dom');
var MovieForm = require('./MovieForm');
var MovieList = require('./MovieList');
var SemanticDropdown = require('./SemanticDropdown');
var AuthenticationForm = require('./AuthenticationForm');

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

    openMovieFormModal: function () {
        $(ReactDOM.findDOMNode(this.refs.movieFormModal))
            .modal('show')
        ;
    },

    render: function () {
        return (
            <div className="el-flex-main-parent">
                <div className="ui inverted main menu">
                    <div className="ui fluid container">
                        <a href="#" className="header item">
                            <img className="logo" src="public/images/logo.png"/>
                            Movies
                        </a>

                        <a className="item" onClick={this.openMovieFormModal}>
                            Add a movie
                        </a>

                        <AuthenticationForm/>
                    </div>
                </div>

                <div className="ui fullscreen modal segment" ref="movieFormModal">
                    <div className="ui two column very relaxed grid">
                        <div className="four wide column">
                            <SemanticDropdown onResultSelect={this.handleResultSelect}/>
                        </div>

                        <div className="ui vertical divider"></div>

                        <div className="twelve wide column">
                        <MovieForm movie={this.state.selectedMovie}
                                   onMovieSubmit={this.handleMovieSubmit}
                                   onMovieAdd={this.handleMovieAdd}/>
                        </div>
                    </div>
                </div>

                <div className="main container">
                    <MovieList url="http://localhost:3000/api/movies"
                               shouldUpdateList={this.state.shouldUpdateList}
                               onMovieClick={this.handleMovieClick}/>
                </div>
            </div>
        );
    }
});