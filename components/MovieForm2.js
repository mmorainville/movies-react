var React = require('react');
var ViewingsForm = require('./ViewingsForm');

module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },
    handleTitleChange: function (e) {
        this.setState({title: e.target.value});
    },
    handleYearChange: function (e) {
        this.setState({year: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var year = this.state.year.trim();
        if (!year || !title) {
            return;
        }
        this.props.onCommentSubmit(this.state);
        this.setState({});
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps.movie);
    },


    handleDirectorChange: function (i, e) {
        var newDirectors = this.state.directors;
        newDirectors[i] = e.target.value;
        this.setState({directors: newDirectors});
    },
    addDirector: function () {
        // var newDirectors = this.state.directors;
        // newDirectors.push('');
        // this.setState({directors: newDirectors});
        if (this.state.directors == undefined) {
            this.setState({directors: ['']});
        } else {
            this.state.directors.push('');
        }
    },
    removeDirector: function (director) {
        // var newDirectors = this.state.directors;
        // newDirectors.push('');
        // this.setState({directors: newDirectors});
        // console.log("DELETE DIRECTOR");
        var index = this.state.directors.indexOf(director);
        if (index > -1) {
            this.state.directors.splice(index, 1);
        }
    },

    render: function () {
        var inputs;
        if (this.state.directors != undefined) {
            inputs = this.state.directors.map(function (director, i) {
                // console.log(director + ' ' + i);
                return (
                    <div>
                        <input type="text" value={this.state.directors[i]} key={i}
                               onChange={this.handleDirectorChange.bind(null, i)}/>
                        <button onClick={this.removeDirector.bind(null, director)}>Remove</button>
                    </div>
                );
            }, this);
        }

        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <pre style={{position:'absolute',right:250 + 'px'}}>{JSON.stringify(this.props, null, 2)}</pre>

                <input type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                <input type="text" value={this.state.year} onChange={this.handleYearChange}/>

                <br/><br/>
                {inputs}
                <button onClick={this.addDirector}>Add</button>

                <br/><br/>
                <ViewingsForm viewings={this.state.viewings}/>

                <br/>
                <input type="submit" value="Post"/>
            </form>
        );
    }
});