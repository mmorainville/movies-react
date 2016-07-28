var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        // return {[this.props.inputsGroup]: this.props.inputs || ['']};
        return {[this.props.inputsGroup]: this.props.inputs};
    },
    handleSimpleFieldChange: function (field, i, e) {
        var newValues = this.state[field];
        newValues[i] = e.target.value;
        this.setState({[field]: newValues});
        this.props.onMultipleInputChange(newValues);
    },
    componentWillReceiveProps: function (nextProps) {
        // this.state[nextProps.inputsGroup] = nextProps.inputs;
        this.setState({[nextProps.inputsGroup]: nextProps.inputs});
        // this.setState({viewings: nextProps.viewings});
    },

    addField: function (field) {
        if (this.state[field] == undefined) {
            this.setState({[field]: ['']});
            this.props.onMultipleInputChange(['']);
        } else {
            var nextState = this.state;
            nextState[field].push('');
            this.setState(nextState);
        }
    },
    removeField: function (newValue, field) {
        var nextState = this.state;

        var index = this.state[field].indexOf(newValue);
        if (index > -1) {
            nextState[field].splice(index, 1);
            this.props.onMultipleInputChange(nextState[field]);
        }
        if (nextState[field].length == 0) {
            this.props.onMultipleInputChange(undefined);
        }

        this.setState(nextState);
    },

    render: function () {
        var forms;
        if (this.state[this.props.inputsGroup] != undefined) {
            forms = this.state[this.props.inputsGroup].map(function (input, i) {
                return (
                    <div key={i} className="field">
                        <div className="ui icon input">
                            <input type="text" value={input} key={this.props.inputsGroup + '-' + i}
                                   onChange={this.handleSimpleFieldChange.bind(null, this.props.inputsGroup, i)}/>
                            <i className="remove link icon"
                               onClick={this.removeField.bind(this, input, this.props.inputsGroup)}></i>
                        </div>
                    </div>
                );
            }, this);
        } else {
            forms = <div className="field">No {this.props.inputsGroup}</div>
        }

        return (
            <div className="multipleInputs">
                <div className="field">
                    <label>{this.props.inputsGroup}</label>
                    <div className="ui stackable vertically padded grid">
                        {forms}
                    </div>
                    <button type="button" className="circular ui icon button" onClick={this.addField.bind(this, this.props.inputsGroup)}>
                        <i className="icon add"></i>
                    </button>
                </div>

                {/*<button type="button" className="ui button" onClick={this.addField.bind(this, this.props.inputsGroup)}>
                    Add
                </button>*/}
            </div>
        );
    }
});