var React = require('react');
var ReactDOM = require('react-dom');
var MovieForm = require('./MovieForm');
var MovieList = require('./MovieList');
var SemanticDropdown = require('./SemanticDropdown');
var AuthenticationForm = require('./AuthenticationForm');
var Highlight = require('./Highlight');

module.exports = React.createClass({
    getInitialState: function () {
        return {selectedMovie: {}, shouldUpdateList: false};
    },

    componentDidMount: function () {
        $(ReactDOM.findDOMNode(this.refs.movieFormSidebar))
            .sidebar({
                context: $('.main.container'),
                transition: 'overlay',
                dimPage: false
            })
        ;
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

    openMovieFormSidebar: function () {
        $(ReactDOM.findDOMNode(this.refs.movieFormSidebar))
            .sidebar('toggle')
        ;
    },

    render: function () {
        return (
            <div className="el-flex-main-parent">
                <div className="ui inverted borderless main menu fixed" style={{height: 60 + 'px'}}>
                    <div className="ui fluid container">
                        <a href="#" className="header item">
                            <img className="logo" src="public/images/logo.png"/>
                            Movies
                        </a>

                        <a className="item" onClick={this.openMovieFormSidebar}>
                            Add a movie
                        </a>

                        <AuthenticationForm/>
                    </div>
                </div>

                <div className="main container" style={{marginTop: 60 + 'px'}}>
                    <div className="ui left very wide sidebar segment" ref="movieFormSidebar" style={{width: 80 + '%'}}>
                        <div className="ui three column padded stackable grid">
                            <div className="four wide column">
                                <SemanticDropdown onResultSelect={this.handleResultSelect}/>
                            </div>

                            <div className="ui vertical divider"></div>

                            <div className="eight wide column">
                                <MovieForm movie={this.state.selectedMovie}
                                           onMovieSubmit={this.handleMovieSubmit}
                                           onMovieAdd={this.handleMovieAdd}/>
                            </div>

                            <div className="ui vertical divider"></div>

                            <div className="four wide column">
                                <Highlight json={this.state.selectedMovie}/>
                            </div>
                        </div>
                    </div>

                    <div className="pusher" style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                        <MovieList url={Config.serverUrl + "/movies"}
                                   shouldUpdateList={this.state.shouldUpdateList}
                                   onMovieClick={this.handleMovieClick}/>
                    </div>
                </div>
            </div>
        );
    }
});