import React, {Component} from 'react';

import MovieRemoteSearch from '../movie-remote-search/MovieRemoteSearch';
import Highlight from '../highlight/Highlight';

class MovieForm extends Component {
    constructor(props) {
        super(props);

        this.state = props;

        this.handleChange = this.handleChange.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({movie: nextProps.movie});
    }

    handleChange(e, field) {
        var newState = this.state.movie;
        if (e.target.value === "") {
            delete newState[field];
        } else {
            newState[field] = e.target.type === "number" ? parseInt(e.target.value, 10) : e.target.value;
        }
        this.setState({
            movie: newState
        });
    }

    handleResultSelect(selectedMovie) {
        this.props.onResultSelect(selectedMovie);
    }

    handleSubmit(e) {
        e.preventDefault();
        // this.props.onSubmitMovieForm(this.state)
    }

    render() {
        return (
            <div className="ui three column padded stackable grid" style={{minHeight: 100 + '%'}}>
                <div className="three wide column ui secondary segment"
                     style={{borderRadius: 0, margin: 0, padding: 1 + 'em'}}>
                    <MovieRemoteSearch onResultSelect={this.handleResultSelect}/>
                </div>

                <div className="height wide column ui container">
                    <h1>Movie form</h1>


                    <form className="movieForm ui form" onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="equal width fields">
                            <div className="field">
                                <label>Title</label>
                                <input type="text" value={this.state.movie.title}
                                       onChange={(e) => this.handleChange(e, 'title')}/>
                            </div>

                            <div className="field">
                                <label>Year</label>
                                <input type="number" value={this.state.movie.year}
                                       onChange={(e) => this.handleChange(e, 'year')}/>
                            </div>
                        </div>

                        <div className="equal width fields">
                            <div className="field">
                                <label>ID</label>
                                <input type="text" value={this.state.movie.id}
                                       onChange={(e) => this.handleChange(e, 'id')}/>
                            </div>
                            <div className="field">
                                <label>Poster</label>
                                <input type="text" value={this.state.movie.poster}
                                       onChange={(e) => this.handleChange(e, 'poster')}/>
                            </div>
                        </div>

                        {/*<MultipleInputs inputs={this.state.directors} inputsGroup="directors"*/}
                        {/*onMultipleInputChange={this.handleMultipleInputChange.bind(this, "directors")}/>*/}

                        {/*<ViewingsForm viewings={this.state.viewings} onViewingChange={this.handleViewingChange}/>*/}

                        <div className="ui divider"></div>

                        <input className="ui positive button" type="submit" value="Post"/>
                        <input className="ui primary button" type="submit" value="Update"/>
                    </form>

                    {/*<MovieForm movie={this.state.selectedMovie}*/}
                    {/*onMovieSubmit={this.handleMovieSubmit}*/}
                    {/*onMovieAdd={this.handleMovieAdd}/>*/}
                </div>

                <div className="five wide column ui tertiary segment"
                     style={{borderRadius: 0, margin: 0, padding: 0, backgroundColor: '#191c1f'}}>
                    <Highlight json={this.props.movie}/>
                </div>
            </div>
        );
    }
}

export default MovieForm;
