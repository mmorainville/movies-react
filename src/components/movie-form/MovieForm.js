import React, {Component} from 'react';

class MovieForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            year: 2014
        };
    }

    handleChange(field, e) {
        var newState = this.state;
        if (e.target.value === "") {
            delete newState[field];
        } else {
            newState[field] = e.target.type === "number" ? parseInt(e.target.value, 10) : e.target.value;
        }
        this.setState(newState);
    }

    handleSubmit(e) {
        e.preventDefault();
        // this.props.onSubmitMovieForm(this.state)
    }

    render() {
        return (
            <div className="ui three column padded stackable grid" style={{flex: 1}}>
                <div className="three wide column ui secondary segment"
                     style={{borderRadius: 0, margin: 0, padding: 1 + 'em'}}>
                    {/*<SemanticDropdown onResultSelect={this.handleResultSelect}/>*/}
                </div>

                <div className="height wide column ui container">
                    <h1>Movie form</h1>


                    <form className="movieForm ui form" onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="equal width fields">
                            <div className="field">
                                <label>Title</label>
                                <input type="text" value={this.state.title}
                                       onChange={this.handleChange.bind(this, 'title')}/>
                            </div>

                            <div className="field">
                                <label>Year</label>
                                <input type="number" value={this.state.year}
                                       onChange={this.handleChange.bind(this, 'year')}/>
                            </div>
                        </div>

                        {/*<div className="equal width fields">*/}
                        {/*<div className="field">*/}
                        {/*<label>ID</label>*/}
                        {/*<input type="text" value={this.state.id} onChange={this.handleChange.bind(this, "id")}/>*/}
                        {/*</div>*/}
                        {/*<div className="field">*/}
                        {/*<label>Poster</label>*/}
                        {/*<input type="text" value={this.state.poster}*/}
                        {/*onChange={this.handleChange.bind(this, "poster")}/>*/}
                        {/*</div>*/}
                        {/*</div>*/}

                        {/*<MultipleInputs inputs={this.state.directors} inputsGroup="directors"*/}
                        {/*onMultipleInputChange={this.handleMultipleInputChange.bind(this, "directors")}/>*/}

                        {/*<ViewingsForm viewings={this.state.viewings} onViewingChange={this.handleViewingChange}/>*/}

                        <div className="ui divider"></div>

                        <input className="ui positive button" type="submit" value="Post"/>
                    </form>

                    {/*<MovieForm movie={this.state.selectedMovie}*/}
                    {/*onMovieSubmit={this.handleMovieSubmit}*/}
                    {/*onMovieAdd={this.handleMovieAdd}/>*/}
                </div>

                <div className="five wide column ui tertiary segment"
                     style={{borderRadius: 0, margin: 0, padding: 0, backgroundColor: '#191c1f'}}>
                    {/*<Highlight json={this.state.selectedMovie}/>*/}
                </div>
            </div>
        );
    }
}

export default MovieForm;
