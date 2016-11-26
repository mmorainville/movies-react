import React, {Component} from 'react';
import MultipleInput from '../multiple-input/MultipleInput';

class ViewingForm extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.addViewing = this.addViewing.bind(this);
        this.removeViewing = this.removeViewing.bind(this);
        this.handleMultipleInputChange = this.handleMultipleInputChange.bind(this);
    }

    handleChange(e, field, i) {
        var newViewing = this.state.viewings;

        if (e.target.value === "") {
            delete newViewing[i][field];
        } else {
            newViewing[i][field] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        }

        this.setState({viewings: newViewing}, function () {
            this.props.onViewingChange(newViewing);
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({viewings: nextProps.viewings});
    }

    handleMultipleInputChange(e, field, i) {
        var newViewing = this.state.viewings;

        // If undefined, there is no more item so we delete the field
        if (e === undefined) {
            delete newViewing[i][field];
        } else {
            newViewing[i][field] = e;
        }

        this.setState({viewings: newViewing});
        this.props.onViewingChange(newViewing);
    }

    addViewing() {
        var newViewings = this.state.viewings;

        if (newViewings === undefined) {
            newViewings = [{}];
        } else {
            newViewings.push({});
        }
        this.setState({viewings: newViewings}, function () {
            this.props.onViewingChange(this.state.viewings);
        });
    }

    removeViewing(index) {
        var newViewings = this.state.viewings;
        newViewings.splice(index, 1);

        if (newViewings.length === 0) {
            this.setState({viewings: undefined}, function () {
                this.props.onViewingChange(undefined);
            });
        } else {
            this.setState({viewings: newViewings}, function () {
                this.props.onViewingChange(newViewings);
            });
        }
    }

    render() {
        return (
            <div className="ViewingForm">
                {
                    this.state.viewings !== undefined &&
                    this.state.viewings.map((viewing, i) => {
                        return (
                            <div key={i} className="ui segment">
                                <h2 style={{marginTop: 0}}>
                                    Viewing <strong>{i + 1}</strong>
                                    <button type="button" className="circular red inverted ui right floated icon button"
                                            onClick={() => this.removeViewing(i)}>
                                        <i className="icon remove"/>
                                    </button>
                                </h2>

                                <div className="field">
                                    <label>Cinema</label>
                                    <input type="text" key={'cinema-' + i} value={this.state.viewings[i].cinema || ''}
                                           onChange={(e) => this.handleChange(e, "cinema", i)}
                                           placeholder="Cinema..."/>
                                </div>

                                <div className="field">
                                    <label>Filename</label>
                                    <input type="text" key={'filename-' + i}
                                           value={this.state.viewings[i].filename || ''}
                                           onChange={(e) => this.handleChange(e, "filename", i)}
                                           placeholder="Filename..."/>
                                </div>

                                <MultipleInput inputField={this.state.viewings[i].cities} inputFieldName="cities"
                                               onMultipleInputChange={(e) => this.handleMultipleInputChange(e, "cities", i)}/>

                                <MultipleInput inputField={this.state.viewings[i].dates} inputFieldName="dates"
                                               onMultipleInputChange={(e) => this.handleMultipleInputChange(e, "dates", i)}/>

                                <MultipleInput inputField={this.state.viewings[i].spectators}
                                               inputFieldName="spectators"
                                               onMultipleInputChange={(e) => this.handleMultipleInputChange(e, "spectators", i)}/>

                                <div className="inline fields" style={{margin: 0}}>
                                    <label>Options</label>
                                    <div className="field">
                                        <div className="ui checkbox">
                                            <input type="checkbox" key={'firstTime-' + i}
                                                   value={this.state.viewings[i].firstTime}
                                                   onClick={(e) => this.handleChange(e, "firstTime", i)}/>
                                            <label>First time</label>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="ui checkbox">
                                            <input type="checkbox" key={'dateValidity-' + i}
                                                   value={this.state.viewings[i].dateValidity}
                                                   onClick={(e) => this.handleChange(e, "dateValidity", i)}/>
                                            <label>Correct date</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
                <button type="button" className="ui button" onClick={() => this.addViewing()}>Add viewing</button>
            </div>
        );
    }
}

export default ViewingForm;
