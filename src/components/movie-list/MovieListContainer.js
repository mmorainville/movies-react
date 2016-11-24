import React, {Component} from 'react';
import low from 'lowdb';
import MovieList from './MovieList';

class MovieListContainer extends Component {
    constructor(props) {
        super(props);

        console.log('MovieListContainer');
        console.log(props);

        this.state = {movies: []};
    }

    componentDidMount() {
        const db = low('db.json');

        db.defaults({ movies: [] }).value();

        // db.get('movies').push({ id: 1, title: 'lowdb is awesome'}).value();

        // console.log('fetchMovies from componentDidMount in MovieList');
        // fetch('https://shielded-savannah-32628.herokuapp.com/api/movies')
        //     .then(response => response.json())
        //     .then(json => {
        //         console.log(json);
        //         db.set('movies', json).value();
        //         // this.setState({movies: json});
        //     })
        this.setState({movies: db.get('movies').sortBy(function(o) {
            let viewingDates = [];
            let defaultDate = '0000-00-00';

            if (o.viewings) {
                for (let value of o.viewings) {
                    value.dates ? viewingDates.push(...value.dates) : viewingDates.push(defaultDate);
                }
            } else {
                viewingDates.push(defaultDate);
            }

            return viewingDates[viewingDates.length - 1];
        }).reverse().value()});
    }

    render() {
        return (
            <MovieList movies={this.state.movies}/>
        );
    }
}

export default MovieListContainer;
