import React, {Component} from 'react';

import Highlight from '../highlight/Highlight';

import $ from 'jquery';
import {API_KEY, TMDB_URL} from '../_shared/constants';

class MovieRemoteSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        $(this.uiSearch)
            .search({
                dataType: 'jsonp',
                apiSettings: {
                    onResponse: function (res) {
                        var response = {
                            results: []
                        };
                        // translate api response to work with dropdown
                        $.each(res.results, function (index, item) {
                            response.results.push({
                                title: item.title,
                                description: item.release_date.split('-')[0],
                                poster: item.poster_path,
                                id: item.id
                            });
                        });
                        return response;
                    },
                    url: TMDB_URL + '/search/movie?query={query}&api_key=' + API_KEY + '&language=fr'
                },
                onSelect: (result, response) => {
                    var selectedMovie = {
                        title: result.title,
                        year: parseInt(result.description, 10),
                        poster: result.poster
                    };

                    this.getDirectorsFromMovie(result.id);

                    this.setState(selectedMovie);
                    this.props.onResultSelect(selectedMovie);
                }
            })
        ;
    }

    componentDidUpdate() {
        $(this.uiSearch).search('refresh');
    }

    getDirectorsFromMovie(movieId) {
        $.ajax({
            url: TMDB_URL + '/movie/' + movieId + '/credits?api_key=' + API_KEY,
            dataType: 'jsonp',
            cache: false,
            type: 'get',
            success: (data) => {
                this.getDirectorsFromCrew(data.crew);
            },
            error: function (xhr, status, err) {
                alert(xhr.status + ': ' + err.toString());
            }
        });
    }

    getDirectorsFromCrew(crew) {
        var movieDirectors = [];
        crew.forEach((person) => {
            if (person.job === "Director") {
                movieDirectors.push(person.name);
            }
        });

        if (movieDirectors.length > 0) {
            this.setState({directors: movieDirectors}, function () {
                this.props.onResultSelect({...this.state});
            });
        }
    }

    render() {
        return (
            <div className="MovieRemoteSearch">
                <div className="ui form">
                    <h4>Search movies</h4>
                    <div className="ui search" ref={(ref) => {
                        this.uiSearch = ref;
                    }}>
                        <div className="ui icon fluid input">
                            <input className="prompt" type="text" placeholder="Search movies..."/>
                            <i className="search icon"/>
                        </div>
                        <div className="results"></div>
                    </div>
                </div>
                <div style={{paddingTop: 1 + 'em', paddingBottom: 1 + 'em'}}>
                    <Highlight json={this.state}/>
                </div>
                <div className="ui image">
                    {this.state.poster &&
                    <img src={'https://image.tmdb.org/t/p/w500' + this.state.poster} role="presentation"/>}
                </div>
            </div>
        );
    }
}

export default MovieRemoteSearch;
