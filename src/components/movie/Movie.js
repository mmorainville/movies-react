import React, {Component} from 'react';
import defaultImage from './images/image-25-opacity.png';

class Movie extends Component {
    render() {
        var directorsList = [];

        if (this.props.movie.directors !== undefined) {
            directorsList = this.props.movie.directors.map(function (director) {
                return director;
            }).join(", ");
        }

        var directors = <span>{directorsList}</span>;

        var posterUrl = "https://image.tmdb.org/t/p/w500" + this.props.movie.poster;
        var poster = this.props.movie.poster ?
            <img src={posterUrl} role="presentation"/> :
            <img src={defaultImage} role="presentation"/>;

        return (
            <div className="movie ui card" ref="movieCard">
                <div className="image" ref="movieImage">
                    {poster}
                </div>

                <div className="content">
                    <div className="header">
                        <a>
                            {this.props.movie.title} ({this.props.movie.year})
                        </a>
                    </div>
                    <div className="meta">
                        {directors}
                    </div>
                </div>

                <div className="ui basic modal" ref="confirmRemoveMovieModal">
                    <i className="close icon"></i>
                    <div className="header">
                        Delete a movie
                    </div>
                    <div className="content">
                        <div className="description">
                            <p>Are you sure you want to delete movie {this.props.movie.id}?</p>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="ui cancel red inverted button">
                            <i className="remove icon"></i>
                            No
                        </div>
                        <div className="ui ok green inverted button">
                            <i className="checkmark icon"></i>
                            Yes
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Movie;
