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
            newState[field] = e.target.value;
        }

        this.setState(newState, function () {
            // this.props.onFilterChange(this.state);
        });
    },

    handleSubmit: function (e) {
        e.preventDefault();
        // console.log("SUBMIT FILTER");
        this.props.onFilterChange(this.state);
    },


    render: function () {
        return (
            <div className="filterMovies">
                <h3>Filter bar</h3>
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="inline fields">
                        <div className="field">
                            <label>Title</label>
                            <input type="text" onChange={this.handleChange.bind(this, "title")}/>
                        </div>

                        <div className="field">
                            <label>Year</label>
                            <input type="text" onChange={this.handleChange.bind(this, "year")}/>
                        </div>

                        <button className="ui button" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
});