import React, {Component} from 'react';

class MultipleInput extends Component {
    constructor(props) {
        super(props);

        this.state = {[this.props.inputFieldName]: this.props.inputField};

        this.handleChange = this.handleChange.bind(this);
        this.addField = this.addField.bind(this);
        this.removeField = this.removeField.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({[nextProps.inputFieldName]: nextProps.inputField});
    }

    handleChange(e, field, i) {
        var newValues = this.state[field];
        newValues[i] = e.target.value;
        this.setState({[field]: newValues});
        this.props.onMultipleInputChange(newValues);
    }

    addField(field) {
        var newValue = field === 'dates' ? new Date().toISOString().substring(0, 10) : '';

        if (this.state[field] === undefined) {
            this.setState({[field]: [newValue]});
            this.props.onMultipleInputChange([newValue]);
        } else {
            var nextState = {...this.state};
            nextState[field].push(newValue);
            this.setState(nextState);
        }
    }

    removeField(newValue, field) {
        var nextState = {...this.state};

        var index = this.state[field].indexOf(newValue);
        if (index > -1) {
            nextState[field].splice(index, 1);
            this.props.onMultipleInputChange(nextState[field]);
        }
        if (nextState[field].length === 0) {
            this.props.onMultipleInputChange(undefined);
        }

        this.setState(nextState);
    }

    render() {
        return (
            <div className="MultipleInput field">
                <label>{this.props.inputFieldName}</label>
                <div className="ui stackable vertically padded grid two fields">
                    {
                        this.state[this.props.inputFieldName] !== undefined &&
                        this.state[this.props.inputFieldName].map((input, i) => {
                            return (
                                <div key={i} className="field">
                                    <div className="ui icon input">
                                        <input type="text" value={input} key={this.props.inputFieldName + '-' + i}
                                               onChange={(e) => this.handleChange(e, this.props.inputFieldName, i)}/>
                                        <i className="remove link icon"
                                           onClick={() => this.removeField(input, this.props.inputFieldName)}/>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <button type="button" className="circular ui icon button"
                        onClick={() => this.addField(this.props.inputFieldName)}>
                    <i className="icon add"/>
                </button>
            </div>
        );
    }
}

export default MultipleInput;
