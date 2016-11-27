import React, {Component} from 'react';
import MovieForm from './MovieForm';

import {db} from '../_shared/db';

class MovieFormContainer extends Component {
    constructor(props) {
        super(props);

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

    render() {
        return (
            <MovieForm movie={this.state.movie} onResultSelect={this.handleResultSelect}/>
        );
    }
}

export default MovieFormContainer;
