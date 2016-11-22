import React, {Component} from 'react';
import MovieForm from './MovieForm';

class MovieFormContainer extends Component {
    constructor(props) {
        super(props);

        console.log(this.props.params.movieId);

        this.state = {
            movie: {
                title: '',
                year: 2014
            }
        };
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
            <MovieForm movie={this.state.movie}/>
        );
    }
}

export default MovieFormContainer;
