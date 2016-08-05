'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');

// jQuery and semantic-ui
var $ = require('jquery');
window.$ = $;
window.jQuery = $;
require('./libs/semantic/dist/semantic');

// Configuration
var Config = require('./components/_config/config.prod.json');
window.Config = Config;

ReactDOM.render(
    <App/>,
    document.getElementById('container')
);
