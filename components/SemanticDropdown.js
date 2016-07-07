var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

    getInitialState() {
        return {};
    },

    componentDidMount() {
        $(ReactDOM.findDOMNode(this.refs.uiSearch))
            .search({
                dataType: 'jsonp',
                apiSettings: {
                    onResponse: function (res) {
                        // console.log(res);
                        var response = {
                            results: []
                        };
                        // translate github api response to work with dropdown
                        $.each(res.results, function (index, item) {
                            // console.log(item);
                            response.results.push({
                                title: item.title,
                                description: item.release_date.split('-')[0],
                                poster: item.poster_path,
                                id: item.id
                            });
                        });
                        return response;
                    },
                    url: 'http://api.themoviedb.org/3/search/movie?query={query}&api_key=abe00801c2dc570aee01aeaf512a2e77&language=fr'
                },
                onSelect: (result, response) => {
                    // console.log(result);
                    var selectedMovie = {
                        title: result.title,
                        year: parseInt(result.description),
                        poster: result.poster
                    };

                    this.getDirectorsFromMovie(result.id);

                    this.setState(selectedMovie);
                    this.props.onResultSelect(selectedMovie);
                    // console.log("---");
                    // console.log(this.state);
                }
            })
        ;
    },

    componentDidUpdate() {
        $(ReactDOM.findDOMNode(this.refs.uiSearch)).search('refresh');
    },

    getDirectorsFromMovie(movieId) {
        $.ajax({
            url: 'http://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=abe00801c2dc570aee01aeaf512a2e77',
            dataType: 'jsonp',
            cache: false,
            type: 'get',
            success: function (data) {
                console.log("success");
                // In case of success, we reset the form
                this.getDirectorsFromCrew(data.crew);
                // this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    getDirectorsFromCrew(crew) {
        var movieDirectors = [];
        crew.forEach(function (person) {
            if (person.job === "Director") {
                movieDirectors.push(person.name);
            }
        }, this);

        if (movieDirectors.length > 0) {
            this.setState({directors: movieDirectors}, function () {
                this.props.onResultSelect(this.state);
            });
        }
    },

    render: function () {
        var posterUrl = "https://image.tmdb.org/t/p/w500" + this.state.poster;
        var poster = this.state.poster ? <img src={posterUrl}/> : "No image";

        return (
            <div>
                <div>
                    <div className="ui search" ref="uiSearch">
                        <input className="prompt" placeholder="Common passwords..." type="text"/>
                        <div className="results"></div>
                    </div>
                </div>
                <div>
                    <div className="ui divider"></div>
                    <pre>{JSON.stringify(this.state, null, 2)}</pre>
                    <div className="ui tiny image">
                        {poster}
                    </div>
                </div>
            </div>
        );
    }
});