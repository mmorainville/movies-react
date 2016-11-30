import React, {Component} from 'react';
import MovieList from './MovieList';

import MovieStore from '../../stores/MovieStore';

import {db} from '../_shared/db';

import {SAMPLE_MOVIES_URL} from '../_shared/constants';

class MovieListContainer extends Component {
    constructor(props) {
        super(props);

        db.defaults({movies: []}).value();

        this.state = {movies: []};

        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        MovieStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        MovieStore.removeChangeListener(this.onChange);
    }

    onChange() {
        console.log('onChange from MovieListContainer');
        this.fetchMovies({sortBy: 'viewings.dates DESC'});
    }

    componentDidMount() {
        this.fetchMovies({sortBy: 'viewings.dates DESC'});
    }

    fetchMovies(filter) {
        let sortBy = filter.sortBy;
        delete filter.sortBy;

        filter.title = filter.title || '';
        filter.year = filter.year || '';
        filter.viewingsSpectators = filter.viewingsSpectators || '';
        filter.viewingsDates = filter.viewingsDates || '';

        let filterFunction = function (movie) {
            let title = movie.title ? movie.title.toLowerCase().indexOf(filter.title.toLowerCase()) > -1 : true;
            let year = movie.year ? movie.year.toString().indexOf(filter.year) > -1 : true;

            // viewings.spectators
            let spectators = [''];
            movie.viewings ? movie.viewings.map((viewing) => {
                return viewing.spectators ? spectators.push(...viewing.spectators) : spectators.push('');
            }) : spectators.push('');

            let viewingsSpectators = spectators.filter((element) => {
                return element.toLowerCase().indexOf(filter.viewingsSpectators.toLowerCase()) > -1;
            }).length;

            // viewings.dates
            let dates = [''];
            movie.viewings ? movie.viewings.map((viewing) => {
                return viewing.dates ? dates.push(...viewing.dates) : dates.push('');
            }) : dates.push('');

            let viewingsDates = dates.filter((element) => {
                return element.toLowerCase().indexOf(filter.viewingsDates.toLowerCase()) > -1;
            }).length;

            return title && year && viewingsSpectators && viewingsDates;
        };

        let movies = [];
        sortBy === 'viewings.dates DESC' ?
            movies = db.get('movies').filter(filterFunction).sortBy([(movie) => this.lastViewingDateSorting(movie), 'year']).reverse().value() :
            movies = db.get('movies').filter(filterFunction).sortBy(sortBy).value();

        this.setState({movies: movies});
    }

    lastViewingDateSorting(movie) {
        let viewingDates = [];
        let defaultDate = '0000-00-00';

        movie.viewings ? movie.viewings.map((viewing) => {
            return viewing.dates ? viewingDates.push(...viewing.dates) : viewingDates.push(defaultDate);
        }) : viewingDates.push(defaultDate);

        return viewingDates[viewingDates.length - 1];
    }

    handleFilterChange(filter) {
        // console.log(filter);
        this.fetchMovies(filter);
    }

    /**
     * Load movies from an external source if there is no movies initially.
     */
    handleLoadMovies() {
        console.log('handleLoadMovies');
        let sampleMoviesFilename = this.props.location.query.sampleMovies ? this.props.location.query.sampleMovies : 'sample-movies';
        fetch(SAMPLE_MOVIES_URL + '/' + sampleMoviesFilename + '.json')
            .then(response => response.json())
            .then(json => {
                    let movies = json.map((element) => {
                        return JSON.parse(element);
                    });

                    console.log(movies);

                    if (movies.length > 0) {
                        this.setState({movies: movies});
                        db.set('movies', movies).value();
                        this.fetchMovies({sortBy: 'viewings.dates DESC'});
                    }
                }
            )
    }

    render() {
        return (
            <MovieList movies={this.state.movies} onFilterChange={(filter) => this.handleFilterChange(filter)}
                       onLoadMovies={() => this.handleLoadMovies()}/>
        );
    }
}

export default MovieListContainer;
