import React, {Component} from 'react';
import MovieFilter from '../movie-filter/MovieFilter';
import Movie from '../movie/Movie';

class MovieList extends Component {
    handleFilterChange(filter) {
        this.props.onFilterChange(filter);
    }

    handleLoadMovies() {
        this.props.onLoadMovies();
    }

    render() {
        return (
            <div className="ui stackable two column padded grid" style={{minHeight: 100 + '%'}}>
                <div className="three wide column ui secondary segment"
                     style={{borderRadius: 0, margin: 0, paddingTop: 1 + 'em'}}>
                    <MovieFilter filter={this.props.filter}
                                 onFilterChange={(filter) => this.handleFilterChange(filter)}/>
                </div>

                <div className="thirteen wide column">
                    <h1>
                        {this.props.movies ? this.props.movies.length + " movie" + (this.props.movies.length !== 1 ? 's' : '') : "Movies"}
                    </h1>

                    {this.props.movies && this.props.movies.length === 0 &&
                    <button className="ui button" onClick={() => this.handleLoadMovies()}>Load movies</button>}

                    <div className="MovieList row centered">
                        <div className="ui stackable centered six doubling cards" ref="uiInfiniteScroll">
                            {
                                this.props.movies.map((movie, i) => {
                                    return (
                                        <Movie movie={movie} key={i}/>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieList;
