import React, {Component} from 'react';
import {Link} from 'react-router';

import NavLink from '../nav-link/NavLink';
import ImportExport from '../import-export/ImportExport';

import {APP_VERSION} from '../_shared/constants';

import logo from './images/logo.svg';
import './App.css';

class App extends Component {
    isElectron() {
        return !!(typeof window !== 'undefined' && window.process && window.process.type === 'renderer') || !!(typeof process !== 'undefined' && process.versions && !!process.versions.electron);
    }

    render() {
        return (
            <div className="App" style={{height: 100 + '%'}}>
                <div className="ui inverted borderless main menu fixed" style={{height: 60 + 'px'}}>
                    <div className="ui fluid container">
                        <Link to="/" className="header item">
                            <img className="logo" src={logo} role="presentation"/>
                            Movies
                        </Link>

                        <NavLink to="/movie-form" className="item"><i className="add circle icon"/>Add a movie</NavLink>
                        <NavLink to="/about" className="item"><i className="help icon"/>About</NavLink>

                        <ImportExport/>

                        {!this.isElectron() &&
                        <div className="item">
                            <a href={'https://dl.dropboxusercontent.com/u/30115317/movies/movies-react-' + APP_VERSION + '-windows.7z'}
                               className="ui basic green inverted circular icon button"
                               title="Download Windows App">
                                <i className="windows icon"/>
                            </a>
                        </div>}
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
