import React, {Component} from 'react';
import MovieList from './MovieList';

import {db} from '../_shared/db';

class MovieListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {movies: []};
    }

    componentDidMount() {
        db.defaults({movies: []}).value();

        this.setState({
            movies: db.get('movies').sortBy(function (movie) {
                let viewingDates = [];
                let defaultDate = '0000-00-00';

                movie.viewings ? movie.viewings.map(function (viewing) {
                    return viewing.dates ? viewingDates.push(...viewing.dates) : viewingDates.push(defaultDate);
                }) : viewingDates.push(defaultDate);

                return viewingDates[viewingDates.length - 1];
            }).reverse().value()
        });
    }

    render() {
        return (
            <MovieList movies={this.state.movies}/>
        );
    }
}

export default MovieListContainer;
