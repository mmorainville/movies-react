import React, {Component} from 'react';
import MovieFilter from '../movie-filter/MovieFilter';
import Movie from '../movie/Movie';

class MovieList extends Component {
    handleFilterChange(e) {
        console.log(e);
    }

    render() {
        var movieNodes = this.props.movies.map(function (movie, i) {
            return (
                <Movie movie={movie} key={i}/>
            );
        });

        return (
            <div className="ui stackable two column padded grid" style={{minHeight: 100 + '%'}}>
                <div className="three wide column ui secondary segment"
                     style={{borderRadius: 0, margin: 0, paddingTop: 1 + 'em'}}>
                    <MovieFilter filter={this.props.filter} onFilterChange={this.handleFilterChange}/>
                </div>

                <div className="thirteen wide column">

                    <div className="ui container">
                        <h1>
                            {this.props.movies ? this.props.movies.length + " movie" + (this.props.movies.length !== 1 ? 's' : '') : "Movies"}
                        </h1>

                        <div className="movieList row centered">
                            <div className="ui stackable centered five doubling cards" ref="uiInfiniteScroll">
                                {movieNodes}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieList;
