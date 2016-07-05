var React = require('react');
var MultipleInputs = require('./MultipleInputs');

module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },
    handleSimpleFieldChange: function (field, i, e) {
        var newViewing = this.state.viewings;
        newViewing[i][field] = e.target.value;
        this.setState({viewings: newViewing});
        this.props.onViewingChange(newViewing);
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({viewings: nextProps.viewings});
    },


    handleMultipleInputChange: function (field, i, newValue) {
        var newViewing = this.state.viewings;

        // If undefined, there is no more item so we delete the field
        if (newValue == undefined) {
            delete newViewing[i][field];
        } else {
            newViewing[i][field] = newValue;
        }

        this.setState({viewings: newViewing});
        this.props.onViewingChange(newViewing);
    },
    addViewing: function () {
        var newViewings = this.state.viewings;

        if (newViewings == undefined) {
            newViewings = [{}];
        } else {
            newViewings.push({});
        }
        this.props.onViewingChange(newViewings);
    },
    removeViewing: function (index) {
        var newViewings = this.state.viewings;
        newViewings.splice(index, 1);
        this.props.onViewingChange(newViewings);
    },

    render: function () {
        var forms;
        if (this.state.viewings != undefined) {
            forms = this.state.viewings.map(function (viewing, i) {
                // console.log(viewing);
                return (
                    <div>
                        <h2>Viewing #{i}</h2>
                        <button onClick={this.removeViewing.bind(null, i)}>Remove viewing</button>
                        <input type="text" value={this.state.viewings[i].cinema} key={'cinema-' + i}
                               onChange={this.handleSimpleFieldChange.bind(null, "cinema", i)}/>
                        <input type="text" value={this.state.viewings[i].date} key={'date-' + i}
                               onChange={this.handleSimpleFieldChange.bind(null, "date", i)}/>
                        <br/>
                        <strong>Spectators</strong>
                        <MultipleInputs inputs={this.state.viewings[i].spectators} inputsGroup="spectators"
                                        onMultipleInputChange={this.handleMultipleInputChange.bind(null, "spectators", i)}/>
                        <strong>Cities</strong>
                        <MultipleInputs inputs={this.state.viewings[i].cities} inputsGroup="cities"
                                        onMultipleInputChange={this.handleMultipleInputChange.bind(null, "cities", i)}/>
                    </div>
                );
            }, this);
        } else {
            forms = <div>No viewings</div>
        }

        return (
            <div className="viewingsForm">
                {forms}
                <button type="button" onClick={this.addViewing}>Add viewing</button>
            </div>
        );
    }
});