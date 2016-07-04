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
            this.state[field].push('');
        }
    },
    removeField: function (newValue, field) {
        var index = this.state[field].indexOf(newValue);
        if (index > -1) {
            this.state[field].splice(index, 1);
        }
        if (this.state[field].length == 0) {
            this.props.onMultipleInputChange(undefined);
        }
    },

    render: function () {
        var forms;
        if (this.state[this.props.inputsGroup] != undefined) {
            forms = this.state[this.props.inputsGroup].map(function (input, i) {
                // console.log(viewing);
                return (
                    <div>
                        <input type="text" value={input} key={this.props.inputsGroup + '-' + i}
                               onChange={this.handleSimpleFieldChange.bind(null, this.props.inputsGroup, i)}/>
                        <button onClick={this.removeField.bind(null, input, this.props.inputsGroup)}>Remove</button>
                    </div>
                );
            }, this);
        } else {
            forms = <div>No {this.props.inputsGroup}</div>
        }

        return (
            <div className="multipleInputs">
                {forms}
                <button onClick={this.addField.bind(null, this.props.inputsGroup)}>Add</button>
            </div>
        );
    }
});