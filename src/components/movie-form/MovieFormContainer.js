import React, {Component} from 'react';
import low from 'lowdb';
import MovieForm from './MovieForm';

import {DB_NAME} from '../_shared/constants';

class MovieFormContainer extends Component {
    constructor(props) {
        super(props);

        const db = low(DB_NAME);
        db._.mixin(require('underscore-db'));

        if (this.props.params.movieId) {
            this.state = {
                movie: db.get('movies').getById(this.props.params.movieId).value()
            }
        } else {
            this.state = {
                movie: {
                    title: '',
                    year: new Date().getFullYear()
                }
            };
        }

        this.handleResultSelect = this.handleResultSelect.bind(this);
    }

    handleResultSelect(selectedMovie) {
        this.setState({
            movie: {
                ...this.state.movie, ...{
                    title: selectedMovie.title,
                    year: selectedMovie.year,
                    poster: selectedMovie.poster,
                    directors: selectedMovie.directors
                }
            }
        });
    }

    componentDidMount() {
        // console.log('fetchMovies from componentDidMount in MovieList');
        // fetch('https://shielded-savannah-32628.herokuapp.com/api/movies')
        //     .then(response => response.json())
        //     .then(json => {
        //         console.log(json);
        //         this.setState({movies: json});
        //     })
    }

    render() {
        return (
            <MovieForm movie={this.state.movie} onResultSelect={this.handleResultSelect}/>
        );
    }
}

export default MovieFormContainer;
