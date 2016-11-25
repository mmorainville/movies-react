import React, {Component} from 'react';
import * as _ from 'lodash';

class MovieFilter extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        let filter = _.mapValues(this.refs, function (ref) {
            return ref.value;
        });

        this.props.onFilterChange(filter);
    }

    render() {
        return (
            <div className="MovieFilter">
                <h4>Filter movies</h4>
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>Title</label>
                        <input type="text" ref="title"/>
                    </div>

                    <div className="field">
                        <label>Year</label>
                        <input type="number" ref="year"/>
                    </div>

                    <div className="field">
                        <label>Seen with</label>
                        <input type="text" ref="viewings.spectators"/>
                    </div>

                    <div className="field">
                        <label>Viewing date</label>
                        <input type="text" ref="viewings.dates"/>
                    </div>

                    <div className="field">
                        <label>Sort by</label>
                        <select className="ui fluid dropdown" ref="sortBy">
                            <option value="viewings.dates DESC">Last viewing date (default)</option>
                            <option value="title">Title</option>
                            <option value="year">Release date ASC</option>
                        </select>
                    </div>

                    <button className="ui button" type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default MovieFilter;
