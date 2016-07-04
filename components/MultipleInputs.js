var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
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

    render: function () {
        var forms;
        if (this.state[this.props.inputsGroup] != undefined) {
            forms = this.state[this.props.inputsGroup].map(function (input, i) {
                // console.log(viewing);
                return (
                    <div>
                        <input type="text" value={input} key={this.props.inputsGroup + '-' + i}
                               onChange={this.handleSimpleFieldChange.bind(null, this.props.inputsGroup, i)}/>
                    </div>
                );
            }, this);
        } else {
            forms = <div>No {this.props.inputsGroup}</div>
        }

        return (
            <div className="multipleInputs">
                {forms}
            </div>
        );
    }
});