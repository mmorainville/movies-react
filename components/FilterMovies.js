var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },

    handleChange: function (field, e) {
        var newState = this.state;

        if (e.target.value == "") {
            delete newState[field];
        } else {
            newState[field] = e.target.type == "number" ? parseInt(e.target.value) : e.target.value;
        }

        this.setState(newState);
    },

    handleSubmit: function (e) {
        e.preventDefault();
        this.props.onFilterChange(this.state);
    },

    handleSortOrderChange: function (e) {
        this.props.onSortOrderChange(e.target.value);
    },


    render: function () {
        return (
            <div className="filterMovies">
                <h4>Filter bar</h4>
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>Title</label>
                        <input type="text" onChange={this.handleChange.bind(this, "title")}/>
                    </div>

                    <div className="field">
                        <label>Year</label>
                        <input type="number" onChange={this.handleChange.bind(this, "year")}/>
                    </div>

                    <div className="field">
                        <label>Seen with</label>
                        <input type="text" onChange={this.handleChange.bind(this, "viewings.spectators")}/>
                    </div>

                    <div className="field">
                        <label>Sort order</label>
                        <select className="ui fluid dropdown" onChange={this.handleSortOrderChange}>
                            <option value="title">Title (default)</option>
                            <option value="year">Release date ASC</option>
                            <option value="viewings.dates DESC">First viewing's dates DESC</option>
                        </select>
                    </div>

                    <button className="ui button" type="submit">Submit</button>
                </form>
            </div>
        );
    }
});