var React = require('react');
var update = require('react-addons-update');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
    getInitialState: function () {
        return {authenticationForm: {email: "", password: ""}, error: ""};
    },

    componentDidMount() {
        $(ReactDOM.findDOMNode(this.refs.dropdown))
            .dropdown()
        ;
    },

    handleChange: function (field, e) {
        var newState = update(this.state, {authenticationForm: {[field]: {$set: e.target.value}}, error: {$set: ""}});
        console.log(newState);
        this.setState(newState);
    },

    handleSubmit: function (e) {
        e.preventDefault();
        console.log(this.state);
        // console.log("SUBMIT FILTER");
        // this.props.onFilterChange(this.state);
        $.ajax({
            url: 'http://localhost:3000/api/Users/login',
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


    render: function () {
        return (
            <div className="authenticationForm right menu">
                <div className="ui right item">
                    {localStorage.getItem('access_token')}
                </div>
                <div className="ui right dropdown item" ref="dropdown">
                    Login
                    <i className="dropdown icon"></i>

                    {localStorage.getItem('access_token') == undefined ?
                        <div className="menu">
                            <div className="item"></div>
                            <form className="ui large form" style={{width: 500 + 'px'}}>
                                <div className="field">
                                    <div className="ui left icon input">
                                        <i className="user icon"></i>
                                        <input type="text" name="email" placeholder="E-mail address"
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

                                <div className="ui negative message">
                                    <p>{this.state.error}</p>
                                </div>

                                <div className="ui fluid large teal submit button" onClick={this.handleSubmit}>
                                    Login
                                </div>
                            </form>
                        </div>
                        :
                        <div className="menu">
                            <div className="item">
                                <p>Logged in! {localStorage.getItem('access_token')}</p>
                                <div className="ui fluid large teal submit button"
                                     onClick={localStorage.removeItem('access_token')}>
                                    Logout
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
});