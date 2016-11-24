import React, {Component} from 'react';
import Movie from '../movie/Movie';

class MovieList extends Component {
    constructor(props) {
        super(props);

        console.log('MovieList');
        console.log(props);
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
                    {/*<FilterMovies onFilterChange={this.handleFilterChange}*/}
                    {/*onSortOrderChange={this.handleSortOrderChange}/>*/}
                </div>

                <div className="thirteen wide column">

                    <div className="ui container">
                        <h1>
                            {/*{this.state.dataCount ? this.state.dataCount + " movie" + (this.state.dataCount != 1 ? 's' : '') : "Movies"}*/}
                        </h1>

                        <div className="movieList row centered">
                            {this.props.isFetching && <h2>Loading...</h2>}
                            <div className="ui stackable centered five doubling cards" ref="uiInfiniteScroll">
                                {movieNodes}
                            </div>
                        </div>

                        {/*{this.state.isLoading ?*/}
                        {/*<div className="ui active centered inline loader"></div> :*/}
                        {/*<div className="ui active centered inline loader" style={{visibility: 'hidden'}}></div>*/}
                        {/*}*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieList;
