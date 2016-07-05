var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

    getInitialState() {
        return {};
    },

    componentDidMount() {
        $(ReactDOM.findDOMNode(this.refs.uiSearch))
            .search({
                apiSettings: {
                    onResponse: function (res) {
                        console.log(res);
                        var
                            response = {
                                results: []
                            }
                            ;
                        // translate github api response to work with dropdown
                        $.each(res, function (index, item) {
                            response.results.push({
                                title: item.title,
                                description: item.year,
                                directors: item.directors,
                                id: item.id
                            });
                        });
                        return response;
                    },
                    url: 'http://localhost:3000/movies?q={query}'
                },
                onSelect: (result, response) => {
                    // console.log(result);
                    this.setState(result);
                    this.props.onResultSelect(result);
                    // console.log("---");
                    // console.log(this.state);
                }
            })
        ;
    },

    componentDidUpdate() {
        $(ReactDOM.findDOMNode(this.refs.uiSearch)).search('refresh');
    },

    render: function () {
        return (
            <div>
                <div>
                    <div className="ui search" ref="uiSearch">
                        <input className="prompt" placeholder="Common passwords..." type="text"/>
                        <div className="results"></div>
                    </div>
                </div>
                <div>
                    <div className="ui divider"></div>
                    <pre>{JSON.stringify(this.state, null, 2)}</pre>
                </div>
            </div>
        );
    }
});