var React = require('react');
var $ = require("jquery");
var FilterMovies = require('./FilterMovies');

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
        var directorsList = this.props.movie.directors.map(function (director) {
            return director;
        }).join(", ");

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

    componentWillReceiveProps: function (nextProps) {
        // console.log(nextProps);
        if (nextProps.shouldUpdateList) {
            console.log("UPDATE MovieList after add");
            this.getMovieList();
        }
    },

    handleFilterChange: function (filters) {
        console.log("FILTER!");
        console.log(filters);

        var preparedFilters = [];
        for (var filter in filters) {
            // console.log(filter + '_like=' + filters[filter]);
            preparedFilters.push(filter + '_like=' + filters[filter]);
        }

        // Build the query params
        preparedFilters = preparedFilters.map(function (filter) {
            return filter;
        }).join("&");

        preparedFilters = preparedFilters == "" ? preparedFilters : "?" + preparedFilters;
        // console.log(preparedFilters);
        this.getMovieList(preparedFilters);
    },

    getMovieList: function (filters) {
        $.ajax({
            url: this.props.url + (filters || ""),
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
                <Movie movie={movie} key={movie.id} onMovieClick={self.handleMovieClick}
                       onRemoveMovie={self.handleRemoveMovie}/>
            );
        });

        return (
            <div>
                <FilterMovies onFilterChange={this.handleFilterChange}/>

                <div className="movieList row centered">
                    <div className="ui stackable centered four doubling cards">
                        {movieNodes}
                    </div>
                </div>
            </div>
        );
    }
});