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
    // handleYearChange: function (e) {
    //     this.setState({year: e.target.value});
    // },
    // handleSubmit: function (e) {
    //     e.preventDefault();
    //     var title = this.state.title.trim();
    //     var year = this.state.year.trim();
    //     if (!year || !title) {
    //         return;
    //     }
    //     this.props.onCommentSubmit(this.state);
    //     this.setState({});
    // },
    componentWillReceiveProps: function (nextProps) {
        this.setState({viewings: nextProps.viewings});
    },


    handleMultipleInputChange: function (field, i, newValue) {
        var newViewing = this.state.viewings;

        // If undefined, there is no more item so we delete the field
        if(newValue == undefined) {
            delete newViewing[i][field];
        } else {
            newViewing[i][field] = newValue;
        }

        this.setState({viewings: newViewing});
        this.props.onViewingChange(newViewing);
    },
    // handleDirectorChange: function (i, e) {
    //     var newDirectors = this.state.directors;
    //     newDirectors[i] = e.target.value;
    //     this.setState({directors: newDirectors});
    // },
    // addDirector: function () {
    //     // var newDirectors = this.state.directors;
    //     // newDirectors.push('');
    //     // this.setState({directors: newDirectors});
    //     if (this.state.directors == undefined) {
    //         this.setState({directors: ['']});
    //     } else {
    //         this.state.directors.push('');
    //     }
    // },
    // removeDirector: function (director) {
    //     // var newDirectors = this.state.directors;
    //     // newDirectors.push('');
    //     // this.setState({directors: newDirectors});
    //     console.log("DELETE DIRECTOR");
    //     var index = this.state.directors.indexOf(director);
    //     if (index > -1) {
    //         this.state.directors.splice(index, 1);
    //     }
    // },

    render: function () {
        var forms;
        if (this.state.viewings != undefined) {
            forms = this.state.viewings.map(function (viewing, i) {
                // console.log(viewing);
                return (
                    <div>
                        <h2>Viewing #{i}</h2>
                        <input type="text" value={this.state.viewings[i].cinema} key={'cinema-' + i}
                               onChange={this.handleSimpleFieldChange.bind(null, "cinema", i)}/>
                        <input type="text" value={this.state.viewings[i].date} key={'date-' + i}
                               onChange={this.handleSimpleFieldChange.bind(null, "date", i)}/>
                        <br/>
                        <strong>Spectators</strong>
                        <MultipleInputs inputs={this.state.viewings[i].spectators} inputsGroup="spectators" onMultipleInputChange={this.handleMultipleInputChange.bind(null, "spectators", i)}/>
                        <strong>Cities</strong>
                        <MultipleInputs inputs={this.state.viewings[i].cities} inputsGroup="cities" onMultipleInputChange={this.handleMultipleInputChange.bind(null, "cities", i)}/>
                    </div>
                );
            }, this);
        } else {
            forms = <div>No viewings</div>
        }

        return (
            <div className="viewingsForm">
                {forms}
            </div>
        );
    }
});