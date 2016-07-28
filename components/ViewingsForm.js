var React = require('react');
var update = require('react-addons-update');
var MultipleInputs = require('./MultipleInputs');

module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },
    handleSimpleFieldChange: function (field, i, e) {
        var newViewing = this.state.viewings;
        if (e.target.value == "") {
            delete newViewing[i][field];
        } else {
            newViewing[i][field] = e.target.type == "checkbox" ? e.target.checked : e.target.value;
        }
        this.setState({viewings: newViewing}, function () {
            this.props.onViewingChange(newViewing);
        });
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
        this.setState({viewings: newViewings}, function () {
            this.props.onViewingChange(this.state.viewings);
        });
    },
    removeViewing: function (index) {
        var newViewings = update(this.state.viewings, {
            $splice: [[index, 1]]
        });
        if (newViewings.length == 0) {
            this.setState({viewings: undefined}, function () {
                this.props.onViewingChange(undefined);
            });
        } else {
            this.setState({viewings: newViewings}, function () {
                this.props.onViewingChange(newViewings);
            });
        }
    },

    render: function () {
        var forms;
        if (this.state.viewings != undefined) {
            forms = this.state.viewings.map(function (viewing, i) {
                // console.log(viewing);
                return (
                    <div key={i} className="ui segment">
                        <h2>
                            Viewing #{i}
                            <button type="button" className="circular red basic ui right floated icon button"
                                    onClick={this.removeViewing.bind(null, i)}>
                                <i className="icon remove"></i>
                            </button>
                        </h2>

                        <div className="field">
                            <input type="text" key={'cinema-' + i} value={this.state.viewings[i].cinema}
                                   onChange={this.handleSimpleFieldChange.bind(null, "cinema", i)}
                                   placeholder="Cinema..."/>
                        </div>

                        <div className="field">
                            <input type="text" key={'filename-' + i} value={this.state.viewings[i].filename}
                                   onChange={this.handleSimpleFieldChange.bind(null, "filename", i)}
                                   placeholder="Filename..."/>
                        </div>

                        <br/>

                        <MultipleInputs inputs={this.state.viewings[i].cities} inputsGroup="cities"
                                        onMultipleInputChange={this.handleMultipleInputChange.bind(null, "cities", i)}/>

                        <MultipleInputs inputs={this.state.viewings[i].dates} inputsGroup="dates"
                                        onMultipleInputChange={this.handleMultipleInputChange.bind(null, "dates", i)}/>

                        <MultipleInputs inputs={this.state.viewings[i].spectators} inputsGroup="spectators"
                                        onMultipleInputChange={this.handleMultipleInputChange.bind(null, "spectators", i)}/>

                        <div className="inline fields">
                            <label>Options</label>
                            <div className="field">
                                <div className="ui checkbox">
                                    <input type="checkbox" key={'firstTime-' + i}
                                           value={this.state.viewings[i].firstTime}
                                           onClick={this.handleSimpleFieldChange.bind(null, "firstTime", i)}/>
                                    <label>First time</label>
                                </div>
                            </div>

                            <div className="field">
                                <div className="ui checkbox">
                                    <input type="checkbox" key={'dateValidity-' + i}
                                           value={this.state.viewings[i].dateValidity}
                                           onClick={this.handleSimpleFieldChange.bind(null, "dateValidity", i)}/>
                                    <label>Correct date</label>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }, this);
        } else {
            forms = <div>No viewings</div>
        }

        return (
            <div className="viewingsForm">
                {forms}
                <button type="button" className="ui button" onClick={this.addViewing}>Add viewing</button>
            </div>
        );
    }
});