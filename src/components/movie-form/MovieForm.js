import React, {Component} from 'react';

import MovieRemoteSearch from '../movie-remote-search/MovieRemoteSearch';
import MultipleInput from '../multiple-input/MultipleInput';
import ViewingForm from '../viewing-form/ViewingForm';
import Highlight from '../highlight/Highlight';

import {db} from '../_shared/db';

class MovieForm extends Component {
    constructor(props) {
        super(props);

        this.state = props;

        this.handleChange = this.handleChange.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleMultipleInputChange = this.handleMultipleInputChange.bind(this);
        this.handleViewingChange = this.handleViewingChange.bind(this);
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

        this.setState({movie: newState});
    }

    handleMultipleInputChange(e, field) {
        var newState = this.state.movie;

        // If the value is undefined, we delete the field
        if (e === undefined) {
            delete newState[field];
        } else {
            newState[field] = e;
        }

        this.setState({movie: newState});
    }

    handleViewingChange(viewings) {
        var newState = this.state.movie;

        if (viewings === undefined) {
            delete newState.viewings;
            this.setState({movie: newState});
        } else {
            newState.viewings = viewings;
            this.setState({movie: newState});
        }
    }

    handleResultSelect(selectedMovie) {
        this.props.onResultSelect(selectedMovie);
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.props.movie.id) {
            db.get('movies').find({id: this.props.movie.id}).assign(this.props.movie).value();
        } else {
            db._.mixin(require('underscore-db'));
            var addedMovie = db.get('movies').insert(this.props.movie).value();
            console.log(addedMovie);
        }

        this.context.router.push('/');
    }

    render() {
        return (
            <div className="ui three column padded stackable grid" style={{minHeight: 100 + '%'}}>
                <div className="three wide column ui secondary segment"
                     style={{borderRadius: 0, margin: 0, padding: 1 + 'em'}}>
                    <MovieRemoteSearch onResultSelect={this.handleResultSelect}/>
                </div>

                <div className="height wide column ui container" style={{backgroundColor: '#f9f9f9'}}>
                    <h1>Movie form</h1>

                    <form className="movieForm ui form" onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="equal width fields">
                            <div className="field">
                                <label>Title</label>
                                <input type="text" value={this.state.movie.title || ''}
                                       onChange={(e) => this.handleChange(e, 'title')}/>
                            </div>

                            <div className="field">
                                <label>Year</label>
                                <input type="number" value={this.state.movie.year || ''}
                                       onChange={(e) => this.handleChange(e, 'year')} min="1"/>
                            </div>
                        </div>

                        <div className="equal width fields">
                            <div className="field">
                                <label>ID</label>
                                <input type="text" value={this.state.movie.id || ''}
                                       onChange={(e) => this.handleChange(e, 'id')}/>
                            </div>
                            <div className="field">
                                <label>Poster</label>
                                <input type="text" value={this.state.movie.poster || ''}
                                       onChange={(e) => this.handleChange(e, 'poster')}/>
                            </div>
                        </div>

                        <MultipleInput inputField={this.state.movie.directors} inputFieldName="directors"
                                       onMultipleInputChange={(e) => this.handleMultipleInputChange(e, "directors")}/>

                        <ViewingForm viewings={this.state.movie.viewings} onViewingChange={this.handleViewingChange}/>

                        <div className="ui divider"></div>

                        {
                            this.props.movie.id ?
                                <input className="ui primary button" type="submit" value="Update"/> :
                                <input className="ui positive button" type="submit" value="Post"/>
                        }
                    </form>
                </div>

                <div className="five wide column ui tertiary segment"
                     style={{borderRadius: 0, margin: 0, padding: 0, backgroundColor: '#191c1f'}}>
                    <Highlight json={this.props.movie}/>
                    {/*<Highlight json={this.state.movie}/>*/}
                </div>
            </div>
        );
    }
}

MovieForm.contextTypes = {
    router: React.PropTypes.object
};

export default MovieForm;
