var React = require('react');
var update = require('react-addons-update');
var ReactDOM = require('react-dom');

var FilterMovies = require('./FilterMovies');
var Highlight = require('./Highlight');
var Movie = require('./Movie');

module.exports = React.createClass({
    getInitialState: function () {
        return {data: [], filters: {limit: 10, skip: 0, order: "title"}};
    },

    componentDidMount: function () {
        console.log("Fetch movie list");
        this.getMovieList();

        var self = this;

        $(ReactDOM.findDOMNode(this.refs.uiInfiniteScroll))
            .visibility({
                once: false,
                // update size when new content loads
                observeChanges: true,
                // load content on bottom edge visible
                onBottomVisible: function () {
                    // loads a max of 5 times
                    console.log("SCROLL!!");
                    var newState = update(self.state, {filters: {skip: {$set: self.state.filters.skip + 10}}});
                    self.setState(newState, function () {
                        // console.log(self.state);
                        self.getMovieList(true);
                    });
                }
            })
        ;
    },

    handleMovieClick: function (movie) {
        this.props.onMovieClick(movie);
    },

    handleRemoveMovie: function () {
        // Same call as in componentDidMount
        console.log("Update after remove");
        var newState = update(this.state, {filters: {skip: {$set: 0}}});
        this.setState(newState, function () {
            this.getMovieList();
        });
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.shouldUpdateList) {
            console.log("UPDATE MovieList after add");
            var newState = update(this.state, {filters: {skip: {$set: 0}}});
            this.setState(newState, function () {
                this.getMovieList();
            });
        }
    },

    handleSortOrderChange: function (order) {
        var newState = update(this.state, {filters: {skip: {$set: 0}, order: {$set: order}}});
        this.setState(newState, function () {
            this.getMovieList();
        });
    },

    handleFilterChange: function (filters) {
        var preparedFilters = {"where": {}};
        for (var filter in filters) {
            if (filter == "title" || filter == "viewings.spectators") {
                preparedFilters.where[filter] = {"like": filters[filter], "options": "i"};
            } else {
                preparedFilters.where[filter] = filters[filter];
            }
        }

        var newState = update(this.state, {filters: {$merge: preparedFilters, skip: {$set: 0}}});
        this.setState(newState, function () {
            this.getMovieList();
        });
    },

    getMovieList: function (infiniteScroll) {
        console.log(this.state.filters);
        this.setState({isLoading: true});

        // Set token if user is logged in
        var access_token = "";
        if (localStorage.getItem('access_token')) {
            access_token = "?access_token=" + localStorage.getItem('access_token');
        }

        // Extract where filter to get the movies count
        var whereFilter = "";
        if (JSON.stringify(this.state.filters.where)) {
            whereFilter = "?where=" + JSON.stringify(this.state.filters.where);
        }

        $.ajax({
            url: this.props.url + "/count" + whereFilter,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({dataCount: data.count});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this),
            complete: function () {
                this.setState({isLoading: false});
            }.bind(this)
        });

        $.ajax({
            url: this.props.url + "?filter=" + JSON.stringify(this.state.filters),
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (infiniteScroll) {
                    var newState = update(this.state, {data: {$push: data}});
                    this.setState(newState);
                } else {
                    this.setState({data: data});
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this),
            complete: function () {
                this.setState({isLoading: false});
            }.bind(this)
        });
    },

    render: function () {
        var self = this;

        var movieNodes = this.state.data.map(function (movie, i) {
            return (
                <Movie movie={movie} key={i} onMovieClick={self.handleMovieClick}
                       onRemoveMovie={self.handleRemoveMovie}/>
            );
        });

        return (
            <div className="ui stackable two column padded grid" style={{flex: 1, height: 100 + '%'}}>
                <div className="three wide column ui secondary segment"
                     style={{borderRadius: 0, margin: 0, paddingTop: 1 + 'em'}}>
                    <FilterMovies onFilterChange={this.handleFilterChange}
                                  onSortOrderChange={this.handleSortOrderChange}/>
                </div>

                <div className="thirteen wide column">

                    <div className="ui container">
                        <h1>
                            {this.state.dataCount ? this.state.dataCount + " movie" + (this.state.dataCount != 1 ? 's' : '') : "Movies"}
                        </h1>

                        <div className="movieList row centered">
                            <div className="ui stackable centered five doubling cards" ref="uiInfiniteScroll">
                                {movieNodes}
                            </div>
                        </div>

                        {this.state.isLoading ?
                            <div className="ui active centered inline loader"></div> :
                            <div className="ui active centered inline loader" style={{visibility: 'hidden'}}></div>
                        }
                    </div>
                </div>
            </div>
        );
    }
});