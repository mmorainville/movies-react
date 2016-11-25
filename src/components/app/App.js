import React, {Component} from 'react';
import {Link} from 'react-router';

import NavLink from '../nav-link/NavLink';

import logo from './images/logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App" style={{height: 100 + '%'}}>
                <div className="ui inverted borderless main menu fixed" style={{height: 60 + 'px'}}>
                    <div className="ui fluid container">
                        <Link to="/" className="header item">
                            <img className="logo" src={logo} role="presentation"/>
                            Movies
                        </Link>

                        <NavLink to="/movie-form" className="item">Add a movie</NavLink>
                        <NavLink to="/about" className="item">About</NavLink>

                        <div className="right menu">
                            <a className="item">Import</a>
                            <a className="item">Export</a>
                            <a className="item">Clear</a>
                        </div>
                    </div>
                </div>

                <div className="main container" style={{paddingTop: 60 + 'px', height: 100 + '%'}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
