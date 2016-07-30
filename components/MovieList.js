var React = require('react');
var update = require('react-addons-update');
var ReactDOM = require('react-dom');

var FilterMovies = require('./FilterMovies');

var Movie = React.createClass({
    handleMovieClick: function (e) {
        this.props.onMovieClick(this.props.movie);
    },

    handleRemoveMovie: function (movieToDeleteId) {
        console.log("DELETE " + movieToDeleteId);

        // this.props.onRemoveMovie();

        // Set token if user is logged in
        var access_token = "";
        if (localStorage.getItem('access_token')) {
            access_token = "?access_token=" + localStorage.getItem('access_token');
        }

        $.ajax({
            url: Config.serverUrl + '/movies/' + movieToDeleteId + access_token,
            dataType: 'json',
            cache: false,
            type: 'delete',
            success: function (data) {
                console.log("success DELETE");
                this.props.onRemoveMovie();
                // this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    render: function () {
        var directorsList = [];

        if (this.props.movie.directors != undefined) {
            directorsList = this.props.movie.directors.map(function (director) {
                return director;
            }).join(", ");
        }

        var directors = <span>{directorsList}</span>;

        var posterUrl = "https://image.tmdb.org/t/p/w500" + this.props.movie.poster;
        var poster = this.props.movie.poster ?
            <img src={posterUrl}/> :
            <img src="public/images/image.png"/>;

        return (
            <div className="movie ui card">
                <div className="image">
                    {poster}
                </div>

                <div className="content">
                    <div className="header">
                        <a href="javascript:undefined" onClick={this.handleMovieClick}>
                            {this.props.movie.title} ({this.props.movie.year})
                        </a>
                    </div>
                    <div className="meta">
                        {directors}
                    </div>
                </div>

                <div className="extra content">
                    <div className="ui two buttons">
                        <div className="ui basic red button"
                             onClick={this.handleRemoveMovie.bind(null, this.props.movie.id)}>Remove
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

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
        // console.log(nextProps);
        if (nextProps.shouldUpdateList) {
            console.log("UPDATE MovieList after add");
            var newState = update(this.state, {filters: {skip: {$set: 0}}});
            this.setState(newState, function () {
                this.getMovieList();
            });
        }
    },

    handleSortOrderChange: function (order) {
        console.log("ORDER!");
        console.log(order);

        var newState = update(this.state, {filters: {skip: {$set: 0}, order: {$set: order}}});
        this.setState(newState, function () {
            this.getMovieList();
        });
    },

    handleFilterChange: function (filters) {
        console.log("FILTER!");
        console.log(filters);

        var preparedFilters = {"where": {}};
        for (var filter in filters) {
            // console.log(filter + '_like=' + filters[filter]);
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

        // console.log(preparedFilters);
    },

    getMovieList: function (infiniteScroll) {
        console.log(this.state.filters);

        // if (infiniteScroll) {
        //     // Do nothing
        // } else {
        //     // Reset the skip filter
        //     var newState = update(this.state, {filters: {skip: {$set: 0}}});
        // }

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
                <div className="three wide column" style={{backgroundColor: 'darkgrey'}}>
                    <FilterMovies onFilterChange={this.handleFilterChange}
                                  onSortOrderChange={this.handleSortOrderChange}/>
                </div>

                <div className="thirteen wide column">
                    <div className="ui container">
                        <h3>Movie list</h3>
                        <div className="movieList row centered">
                            <div className="ui stackable centered five doubling cards" ref="uiInfiniteScroll">
                                {movieNodes}
                            </div>
                        </div>

                        <div className="ui active centered inline loader"></div>
                    </div>
                </div>
            </div>
        );
    }
});