import React, {Component} from 'react';
import MovieList from './MovieList';

class MovieListContainer extends Component {
    constructor(props) {
        super(props);

        console.log('MovieListContainer');
        console.log(props);

        this.state = {movies: []};
    }

    componentDidMount() {
        console.log('fetchMovies from componentDidMount in MovieList');
        fetch('https://shielded-savannah-32628.herokuapp.com/api/movies')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({movies: json});
            })
    }

    render() {
        return (
            <MovieList movies={this.state.movies}/>
        );
    }
}

export default MovieListContainer;