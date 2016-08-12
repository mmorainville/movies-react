var React = require('react');
var ReactDOM = require('react-dom');

var Highlight = require('./Highlight');

module.exports = React.createClass({
    handleMovieClick: function (e) {
        this.props.onMovieClick(this.props.movie);
    },

    componentDidMount: function () {
        $('.movie .image')
            .dimmer({
                on: 'hover'
            })
        ;

        $(ReactDOM.findDOMNode(this.refs.movieImage))
            .popup({
                hoverable: true,
                inline: false,
                position: 'right center',
                popup: $(ReactDOM.findDOMNode(this.refs.movieDetails)),
                lastResort: 'bottom center',
                boundary: '.pusher'
            })
        ;
    },

    confirmRemoveMovie: function (movieToDeleteId) {
        var self = this;
        $(ReactDOM.findDOMNode(this.refs.confirmRemoveMovieModal))
            .modal({
                onApprove: function () {
                    self.handleRemoveMovie(movieToDeleteId);
                }
            })
            .modal('show')
        ;
    },

    handleRemoveMovie: function (movieToDeleteId) {
        console.log("DELETE " + movieToDeleteId);

        // Set token if user is logged in
        var access_token = "";
        if (localStorage.getItem('access_token')) {
            access_token = "?access_token=" + localStorage.getItem('access_token');
        }

        $.ajax({
            url: Config.serverUrl + '/movies/' + movieToDeleteId + access_token,
            dataType: 'json',
            cache: false,
            type: 'delete',
            success: function (data) {
                console.log("success DELETE");
                this.props.onRemoveMovie();
            }.bind(this),
            error: function (xhr, status, err) {
                alert(xhr.status + ': ' + err.toString());
            }.bind(this)
        });
    },

    render: function () {
        var directorsList = [];

        if (this.props.movie.directors != undefined) {
            directorsList = this.props.movie.directors.map(function (director) {
                return director;
            }).join(", ");
        }

        var directors = <span>{directorsList}</span>;

        var posterUrl = "https://image.tmdb.org/t/p/w500" + this.props.movie.poster;
        var poster = this.props.movie.poster ?
            <img src={posterUrl}/> :
            <img src="public/images/image-25-opacity.png"/>;

        return (
            <div className="movie ui card" ref="movieCard">
                <div className="image" ref="movieImage">
                    <div className="ui dimmer">
                        <div className="content">
                            <div className="center">
                                <h2 className="ui inverted header">{this.props.movie.title}</h2>
                                <div className="ui red inverted button"
                                     onClick={this.confirmRemoveMovie.bind(null, this.props.movie.id)}>Remove
                                </div>
                                <a className="ui green inverted button" ref="viewMovieDetails"
                                   href={"http://www.allocine.fr/recherche/?q=" + this.props.movie.title}
                                   target="_blank">View</a>
                                <div className="ui flowing popup" ref="movieDetails"
                                     style={{border: 'none', padding: 0}}>
                                    <Highlight json={this.props.movie}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {poster}
                </div>

                <div className="content">
                    <div className="header">
                        <a href="javascript:undefined" onClick={this.handleMovieClick}>
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
});