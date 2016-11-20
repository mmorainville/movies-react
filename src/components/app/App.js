import React, {Component} from 'react';
import {Link} from 'react-router';

import NavLink from '../nav-link/NavLink';

import logo from './images/logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="el-flex-main-parent">
                <div className="ui inverted borderless main menu fixed" style={{height: 60 + 'px'}}>
                    <div className="ui fluid container">
                        <Link to="/" className="header item">
                            <img className="logo" src={logo} role="presentation"/>
                            Movies
                        </Link>

                        <NavLink to="/about" className="item">About</NavLink>
                        {/*<NavLink to="/movie-form" className="item">Movie form</NavLink>*/}

                        {/*<AuthenticationForm/>*/}
                    </div>
                </div>

                <div className="main container" style={{marginTop: 60 + 'px'}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
