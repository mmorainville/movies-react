var React = require('react');
var update = require('react-addons-update');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
    getInitialState: function () {
        return {authenticationForm: {email: "", password: ""}, error: ""};
    },

    componentDidMount() {
        this.initSemanticComponents();
    },

    componentDidUpdate() {
        this.initSemanticComponents();
    },

    initSemanticComponents: function () {
        $(ReactDOM.findDOMNode(this.refs.loginModal))
            .popup({
                position: 'bottom right',
                on: 'click',
                lastResort: 'bottom right'
            })
        ;

        $(ReactDOM.findDOMNode(this.refs.loginForm))
            .form({
                fields: {
                    email: 'empty',
                    password: 'empty'
                },
                onSuccess: false
            })
        ;
    },

    handleChange: function (field, e) {
        var newState = update(this.state, {authenticationForm: {[field]: {$set: e.target.value}}, error: {$set: ""}});
        this.setState(newState);
    },

    handleSubmit: function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(this.state);
        // console.log("SUBMIT FILTER");
        // this.props.onFilterChange(this.state);
        $.ajax({
            url: Config.serverUrl + '/Users/login',
            dataType: 'json',
            cache: false,
            type: 'post',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log("LOGIN success");
                console.log(data);
                localStorage.setItem('access_token', data.id);
                // In case of success, we reset the form
                this.setState(this.getInitialState());
            }.bind(this),
            error: function (xhr, status, err) {
                console.error("login", status, err.toString());
                this.setState({
                    error: err.toString()
                })
            }.bind(this),
            data: JSON.stringify(this.state.authenticationForm)
        });
    },

    removeToken: function () {
        localStorage.removeItem('access_token');
        this.setState(this.getInitialState());
    },

    render: function () {
        return (
            <div className="authenticationForm right menu">
                {localStorage.getItem('access_token') == undefined ?
                    <div className="ui right dropdown item" ref="loginModal">
                        Login
                        <i className="dropdown icon"></i>
                    </div>
                    :
                    <div className="ui right dropdown item" onClick={this.removeToken}>
                        Logout {localStorage.getItem('access_token').substring(0, 7)}
                    </div>
                }

                {localStorage.getItem('access_token') == undefined ?
                    <div className="ui flowing basic popup">
                        <form className="ui large form" ref="loginForm" onSubmit={this.handleSubmit}>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" name="email" placeholder="Email address"
                                           onChange={this.handleChange.bind(this, "email")}/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" name="password" placeholder="Password"
                                           onChange={this.handleChange.bind(this, "password")}/>
                                </div>
                            </div>

                            <div className="ui error message">
                                <p>{this.state.error}</p>
                            </div>

                            {this.state.error ?
                                <div className="ui negative message">
                                    <p>{this.state.error}</p>
                                </div>
                                :
                                ""
                            }

                            <button type="submit" className="ui fluid large teal submit button">
                                Login
                            </button>
                        </form>
                    </div>
                    :
                    ""
                }
            </div>
        );
    }
});