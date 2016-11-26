import React, {Component} from 'react';
import low from 'lowdb';
import MovieList from './MovieList';

import {DB_NAME} from '../_shared/constants';

class MovieListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {movies: []};
    }

    componentDidMount() {
        const db = low(DB_NAME);

        db.defaults({movies: []}).value();

        // db.get('movies').push({ id: 1, title: 'lowdb is awesome'}).value();

        // console.log('fetchMovies from componentDidMount in MovieList');
        // fetch('https://shielded-savannah-32628.herokuapp.com/api/movies')
        //     .then(response => response.json())
        //     .then(json => {
        //         console.log(json);
        //         db.set('movies', json).value();
        //         // this.setState({movies: json});
        //     });

        this.setState({
            movies: db.get('movies').sortBy(function (movie) {
                let viewingDates = [];
                let defaultDate = '0000-00-00';

                movie.viewings ? movie.viewings.map(function (viewing) {
                    return viewing.dates ? viewingDates.push(...viewing.dates) : viewingDates.push(defaultDate);
                }) : viewingDates.push(defaultDate);

                return viewingDates[viewingDates.length - 1];

                // let viewingDates = [];
                // let defaultDate = '0000-00-00';
                //
                // if (movie.viewings) {
                //     for (let value of movie.viewings) {
                //         value.dates ? viewingDates.push(...value.dates) : viewingDates.push(defaultDate);
                //     }
                // } else {
                //     viewingDates.push(defaultDate);
                // }
                //
                // return viewingDates[viewingDates.length - 1];
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
