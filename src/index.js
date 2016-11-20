import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory, IndexRoute, Router, Route} from 'react-router';

import App from './components/app/App';
import About from './components/about/About';
import MovieListContainer from "./components/movie-list/MovieListContainer";

// jQuery
import $ from 'jquery';
import jQuery from 'jquery';
window.$ = $;
window.jQuery = jQuery;

// Semantic UI
require('../semantic/dist/semantic');
import '../semantic/dist/semantic.css';

import './index.css';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={MovieListContainer}/>

            <Route path="/about" component={About}/>
            {/*<Route path="/movie-form" component={MovieFormContainer}/>*/}

            {/*<Route path="*" component={NotFound}/>*/}
        </Route>
    </Router>,
    document.getElementById('root')
);
