import React, {Component} from 'react';
import {Link} from 'react-router';
import defaultImage from './images/image-25-opacity.png';

import Highlight from '../highlight/Highlight';

import {db} from '../_shared/db';

import $ from 'jquery';

class Movie extends Component {
    constructor(props) {
        super(props);

        this.confirmRemoveMovie = this.confirmRemoveMovie.bind(this);
    }

    componentDidMount() {
        $(this.movieImage).dimmer({on: 'hover'});

        $(this.movieImage)
            .popup({
                hoverable: true,
                inline: false,
                position: 'right center',
                popup: $(this.movieDetails),
                lastResort: 'bottom center',
                // boundary: '.ui.stackable.two.column.padded.grid'
            });
    }

    confirmRemoveMovie(movieToDeleteId) {
        $(this.confirmRemoveMovieModal)
            .modal({onApprove: () => this.handleRemoveMovie(movieToDeleteId)})
            .modal('show');
    }

    handleRemoveMovie(movieToDeleteId) {
        console.log('handleRemoveMovie: ' + movieToDeleteId);
        db.get('movies').remove({id: movieToDeleteId}).value();
    }

    render() {
        var directorsList = [];

        if (this.props.movie.directors) {
            directorsList = this.props.movie.directors.map(function (director) {
                return director;
            }).join(", ");
        }

        var directors = <span>{directorsList}</span>;

        var posterUrl = "https://image.tmdb.org/t/p/w500" + this.props.movie.poster;

        return (
            <div className="movie ui card" ref="movieCard">
                <div className="dimmable image" ref={(ref) => {
                    this.movieImage = ref;
                }}>
                    <div className="ui dimmer">
                        <div className="content">
                            <div className="center">
                                <h2 className="ui inverted header">{this.props.movie.title}</h2>

                                <a className="ui green inverted button" ref="viewMovieDetails"
                                   href={"http://www.allocine.fr/recherche/?q=" + this.props.movie.title}
                                   target="_blank">View</a>
                                <div className="ui red inverted button"
                                     onClick={() => this.confirmRemoveMovie(this.props.movie.id)}>Remove
                                </div>

                                <div className="ui flowing popup" ref={(ref) => {
                                    this.movieDetails = ref;
                                }} style={{border: 'none', padding: 0}}>
                                    <Highlight json={this.props.movie}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <img src={this.props.movie.poster ? posterUrl : defaultImage} role="presentation"/>
                </div>

                <div className="content">
                    <div className="header">
                        <Link to={'/movie-form/' + this.props.movie.id}>
                            {this.props.movie.title} {this.props.movie.year && '(' + this.props.movie.year + ')'}
                        </Link>
                    </div>
                    <div className="meta">{directors}</div>
                </div>

                <div className="ui basic modal" ref={(ref) => {
                    this.confirmRemoveMovieModal = ref;
                }}>
                    <i className="close icon"/>
                    <div className="header">Delete a movie</div>
                    <div className="content">
                        <div className="description">
                            <p>Are you sure you want to delete movie {this.props.movie.id}?</p>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="ui cancel red inverted button"><i className="remove icon"/>No</div>
                        <div className="ui ok green inverted button"><i className="checkmark icon"/>Yes</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Movie;
